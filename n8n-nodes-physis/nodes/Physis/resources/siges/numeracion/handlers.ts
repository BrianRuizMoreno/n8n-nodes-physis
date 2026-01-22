import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlGlobal = '/phy2service/api/siges/numeradores';
	const baseUrlEjercicio = '/phy2service/api/siges/ejercicios';

	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;
	const idEjercicio = this.getNodeParameter('idEjercicio', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = idEjercicio 
				? `${baseUrlEjercicio}/${idEjercicio}/numeradores` 
				: baseUrlGlobal;
			break;
		case 'get':
			endpoint = idEjercicio 
				? `${baseUrlEjercicio}/${idEjercicio}/numeradores/${id}` 
				: `${baseUrlGlobal}/${id}`;
			break;
		case 'create':
			endpoint = baseUrlGlobal;
			method = 'POST';
			break;
		case 'update':
			endpoint = baseUrlGlobal;
			method = 'PUT';
			break;
		case 'delete':
			endpoint = baseUrlGlobal;
			method = 'DELETE';
			qs.idNumerador = id;
			break;
		case 'getByPrefixType':
			endpoint = '/phy2service/api/siges/numeradores-prefijos';
			break;
		case 'getOrigin':
			endpoint = '/phy2service/api/siges/numeradores-origen';
			qs.idNumerador = id;
			break;
		case 'getLastNumberNoPrefix':
			endpoint = `/phy2service/api/siges/numeradores-sin-prefijo/${id}`;
			if (idEjercicio) qs.IdEjercicio = idEjercicio;
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