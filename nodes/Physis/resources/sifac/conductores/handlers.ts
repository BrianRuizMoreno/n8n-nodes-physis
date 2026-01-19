import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	const baseUrlSifac = '/phy2service/api/sifac/conductores';
	const baseUrlSacer = '/phy2service/api/sacer/v2/conductores';

	switch (operation) {
		case 'getAll':
			endpoint = baseUrlSifac;
			break;
		case 'getGrid':
			endpoint = baseUrlSacer;
			break;
		case 'get':
			endpoint = `${baseUrlSifac}/${id}`;
			break;
		case 'create':
			endpoint = baseUrlSifac;
			method = 'POST';
			break;
		case 'update':
			endpoint = `${baseUrlSifac}/${id}`;
			method = 'PUT';
			break;
		case 'delete':
			endpoint = `${baseUrlSifac}/${id}`;
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