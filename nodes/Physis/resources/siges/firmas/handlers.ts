import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/firmas';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'get':
			const codFirma = this.getNodeParameter('codFirma', index) as number;
			endpoint = `${baseUrl}/${codFirma}`;
			qs = {
				incluirArchivos: this.getNodeParameter('incluirArchivos', index) as boolean
			};
			break;

		case 'create':
			method = 'POST';
			endpoint = baseUrl;

			const nombre = this.getNodeParameter('nombreFirmante', index, '') as string;
			const apellido = this.getNodeParameter('apellidoFirmante', index, '') as string;

			body = {
				FechaFirma: new Date().toISOString() 
			};

			if (nombre) body.NombreFirmante = nombre;
			if (apellido) body.ApellidoFirmante = apellido;

			const items = this.getInputData();
			const item = items[index];

			const addAttachment = async (formField: string, binaryProp: string, defaultName: string) => {
				if (item.binary && item.binary[binaryProp]) {
					const binaryData = item.binary[binaryProp];
					const buffer = await this.helpers.getBinaryDataBuffer(index, binaryProp);
					
					body[formField] = {
						value: buffer,
						options: {
							filename: binaryData.fileName || defaultName,
							contentType: binaryData.mimeType || 'image/png',
						},
					};
				}
			};

			const propFirma = this.getNodeParameter('binaryPropertyFirma', index) as string;
			if (!item.binary || !item.binary[propFirma]) {
			} else {
				await addAttachment('imagen', propFirma, 'firma.png');
			}

			const propImg2 = this.getNodeParameter('binaryPropertyImg2', index, '') as string;
			if (propImg2) await addAttachment('imagen2', propImg2, 'dni_frente.jpg');

			const propImg3 = this.getNodeParameter('binaryPropertyImg3', index, '') as string;
			if (propImg3) await addAttachment('imagen3', propImg3, 'dni_dorso.jpg');
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST') {
				body = { ...body, ...json };
			} else {
				qs = { ...qs, ...json };
			}
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}