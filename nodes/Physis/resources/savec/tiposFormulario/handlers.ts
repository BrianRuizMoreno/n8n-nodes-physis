import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	let endpoint = '/phy2service/api/savec/tipos-formulario';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};
	let id = '';

	try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

	try { 
		const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
		if (['create', 'update'].includes(operation)) {
			body = json as IDataObject;
		}
	} catch (e) {}

	switch (operation) {
		case 'getAll':
			break;
		case 'get':
			endpoint = `${endpoint}/${id}`;
			break;
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete':
			endpoint = `${endpoint}/${id}`;
			method = 'DELETE';
			break;
		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}