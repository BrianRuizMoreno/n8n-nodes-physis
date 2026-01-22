import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/silab/ordenes-partes';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = baseUrl;
			break;
		case 'get':
			endpoint = `${baseUrl}/${id}`;
			break;
		case 'upsert':
			endpoint = baseUrl;
			method = 'POST';
			break;
		case 'delete':
			endpoint = baseUrl;
			method = 'DELETE';
			break;
		case 'getPuma':
			endpoint = '/phy2service/api/silab/partes-puma';
			break;
		case 'getDeleted':
			endpoint = '/phy2service/api/silab/partes-eliminados';
			break;
		case 'itemsEstados':
			endpoint = `${baseUrl}/items/estados`;
			method = 'POST';
			break;
		case 'getByPersonal':
			endpoint = `/phy2service/api/silab/personal/${id}/partes`;
			break;
		case 'getByItems':
			endpoint = `/phy2service/api/silab/personal/${id}/partes/items`;
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

	if (operation === 'delete' && id && !qs.IdParteDeLabores) {
		qs.IdParteDeLabores = id;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}