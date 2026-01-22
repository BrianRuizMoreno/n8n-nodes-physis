import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = `${baseUrl}/cuentas-auxi`;
			break;

		case 'get':
			endpoint = `${baseUrl}/cuentas-auxi/${id}`;
			break;

		case 'getByPlan':
			const idAuxi = this.getNodeParameter('idAuxi', index) as number;
			endpoint = `${baseUrl}/planes-ctas-auxiliares/${idAuxi}/cuentas`;
			break;

		case 'getNextId':
			endpoint = `${baseUrl}/cuentas-auxi/siguiente`;
			break;

		case 'create':
			method = 'POST';
			endpoint = `${baseUrl}/cuentas-auxi`;
			qs = {
				convenioMultilateral: this.getNodeParameter('convenioMultilateral', index, false),
				obligadoDirecto: this.getNodeParameter('obligadoDirecto', index, false)
			};
			break;

		case 'update':
			method = 'PUT';
			endpoint = `${baseUrl}/cuentas-auxi`;
			break;

		case 'delete':
			method = 'DELETE';
			endpoint = `${baseUrl}/cuentas-auxi`;
			break;

		case 'getTree':
			endpoint = `${baseUrl}/cuentas-auxiliares/arbol`;
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