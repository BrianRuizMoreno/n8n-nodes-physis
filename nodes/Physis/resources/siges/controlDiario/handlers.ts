import { IExecuteFunctions, IDataObject, INodeExecutionData, NodeApiError } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/informe-control-diario-billetera';
	const endpoint = baseUrl;
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'uploadFile':
			method = 'POST';
			
			const binaryPropertyName = this.getNodeParameter('binaryPropertyName', index) as string;
			
			const items = this.getInputData();
			const item = items[index];
			
			if (!item.binary || !item.binary[binaryPropertyName]) {
				throw new NodeApiError(this.getNode(), {}, { message: `No se encontraron datos binarios en la propiedad "${binaryPropertyName}".` });
			}

			const binaryData = item.binary[binaryPropertyName];
			const buffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
			
			let fileName = this.getNodeParameter('fileName', index, '') as string;
			if (!fileName) {
				fileName = binaryData.fileName || 'archivo_conciliacion.txt';
			}

			body = {
				archivo: {
					value: buffer,
					options: {
						filename: fileName,
						contentType: binaryData.mimeType || 'application/octet-stream',
					},
				},
			};

			qs = {
				nombre: fileName
			};
			break;

		case 'getReport':
			qs = {
				filePath: this.getNodeParameter('filePath', index) as string
			};
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