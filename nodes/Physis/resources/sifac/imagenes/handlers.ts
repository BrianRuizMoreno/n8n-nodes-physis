import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let baseUrl = '/phy2service/api/sifac/imagenes';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	let id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = baseUrl;
			break;
		case 'get':
			endpoint = `${baseUrl}/${id}`;
			break;
		case 'create':
			endpoint = baseUrl;
			method = 'POST';
			break;
		case 'update':
			endpoint = baseUrl;
			method = 'PUT';
			break;
		case 'delete':
			endpoint = baseUrl;
			method = 'DELETE';
			break;
		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST' || method === 'PUT') {
				body = json;
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