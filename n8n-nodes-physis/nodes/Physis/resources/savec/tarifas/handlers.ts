import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/savec';
	let method = 'GET';
	let body: IDataObject | IDataObject[] = [];
	let qs: IDataObject = {};

	switch (operation) {
		// --- Cosechero ---
		case 'getCosechero':
			endpoint = `${endpoint}/tarifas-cosechero`;
			qs.codCereal = this.getNodeParameter('codCereal', index) as number;
			qs.codCampo = this.getNodeParameter('codCampo', index) as number;
			break;
		case 'createCosechero':
			endpoint = `${endpoint}/tarifas-cosechero`;
			method = 'POST';
			break;
		case 'deleteCosechero':
			endpoint = `${endpoint}/tarifas-cosechero`;
			method = 'DELETE';
			qs.codCereal = this.getNodeParameter('codCereal', index) as number;
			qs.codCampo = this.getNodeParameter('codCampo', index) as number;
			break;

		// --- Secado ---
		case 'getSecado':
			endpoint = `${endpoint}/tarifa-secado`;
			qs.codCereal = this.getNodeParameter('codCereal', index) as number;
			qs.codPlanta = this.getNodeParameter('codPlanta', index) as number;
			break;
		case 'createSecado':
			endpoint = `${endpoint}/tarifa-secado`;
			method = 'POST';
			break;
		case 'deleteSecado':
			endpoint = `${endpoint}/tarifa-secado`;
			method = 'DELETE';
			qs.codCereal = this.getNodeParameter('codCereal', index) as number;
			qs.codPlanta = this.getNodeParameter('codPlanta', index) as number;
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson);

			if (method === 'POST' || method === 'PUT') {
				body = json;
			} else {
				if (typeof json === 'object' && !Array.isArray(json) && json !== null) {
					qs = { ...qs, ...json };
				}
			}
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	const response = await transport.request(method, endpoint, body as unknown as IDataObject, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}