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

	switch (operation) {
		case 'getAll':
			endpoint = '/phy2service/api/sach/lotes';
			break;
		case 'getAllGrid':
			endpoint = '/phy2service/api/sach/v2/lotes';
			break;
		case 'get':
			endpoint = `/phy2service/api/sach/lotes/${id}`;
			break;
		case 'upsert':
			endpoint = '/phy2service/api/sach/lotes';
			method = 'POST';
			break;
		case 'delete':
			endpoint = '/phy2service/api/sach/lotes';
			method = 'DELETE';
			break;
		case 'getByCarga':
			endpoint = `/phy2service/api/sach/lotesbycarga/${id}`;
			break;
		case 'upsertByCarga':
			endpoint = '/phy2service/api/sach/lotesbycarga';
			method = 'POST';
			break;
		case 'deleteByCarga':
			endpoint = '/phy2service/api/sach/lotesbycarga';
			method = 'DELETE';
			break;
		case 'getProximo':
			endpoint = `/phy2service/api/sach/lotes/proximo/${id}`;
			break;
		case 'getPuestos':
			endpoint = '/phy2service/api/sach/lotes/puestosdecarga';
			break;
		case 'getFormasCobro':
			endpoint = '/phy2service/api/sach/lotes/formasdecobro';
			break;
		case 'getExisteBoleto':
			endpoint = '/phy2service/api/sach/lotes/existeboleto';
			break;
		case 'getPendientes':
			endpoint = '/phy2service/api/sach/lotes/pendientesdeemision';
			break;
		case 'getTipoComprobante':
			endpoint = '/phy2service/api/sach/lotes/tipo-comprobante';
			break;
		case 'getPrefijos':
			endpoint = '/phy2service/api/sach/lotes/prefijos';
			break;
		case 'getGastoComisionTotal':
			endpoint = '/phy2service/api/sach/lotes/gasto-comision-total';
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