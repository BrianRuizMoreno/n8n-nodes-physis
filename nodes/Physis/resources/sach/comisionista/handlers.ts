import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sach/comisionistas';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;
	const idCliente = this.getNodeParameter('idCliente', index, '') as string;
	const idLugar = this.getNodeParameter('idLugar', index, '') as string;

	switch (operation) {
		case 'getAll':
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'get':
			endpoint = `${endpoint}/${id}`;
			break;
		case 'getArbol':
			endpoint = `${endpoint}/arbol`;
			break;
		case 'getArbolAll':
			endpoint = `${endpoint}/arbol_all`;
			break;
		case 'getByCliente':
			endpoint = `${endpoint}/cliente/${idCliente}`;
			break;
		case 'getAutoByCliente':
			endpoint = `${endpoint}/cliente/para-lote`;
			break;
		case 'getClientesOfComisionista':
			endpoint = `${endpoint}/clientesDeComisionista/${id}`;
			break;
		case 'getByLugar':
			endpoint = `${endpoint}/lugar/${idLugar}`;
			break;
		case 'getAvailableForLugar':
			endpoint = `${endpoint}/lugar/disponibles/${idLugar}`;
			break;
		case 'getAutoByLugar':
			endpoint = `${endpoint}/lugar/para-lote`;
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