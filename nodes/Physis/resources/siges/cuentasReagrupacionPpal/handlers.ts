import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlConsultas = '/phy2service/api/siges/cuentas-reagrupacion-ppal';
	const baseUrlABM = '/phy2service/api/siges/cuentas-reagrupaciones-ppales';
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = baseUrlConsultas;
			break;
		case 'get':
			endpoint = `${baseUrlConsultas}/${id}`;
			break;
		case 'getArbol':
			endpoint = `${baseUrlConsultas}/arbol`;
			break;
		case 'getTreeList':
			endpoint = `${baseUrlConsultas}/treelist`;
			break;
		case 'getNext':
			endpoint = '/phy2service/api/siges/cuentas-reagrupacion-Ppal/Next';
			if (id) qs.sCuenta = id;
			break;			
		case 'create':
			endpoint = baseUrlABM;
			method = 'POST';
			break;
		case 'update':
			endpoint = baseUrlABM;
			method = 'PUT';
			break;
		case 'delete':
			endpoint = baseUrlABM;
			method = 'DELETE';
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
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