import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let id = this.getNodeParameter('id', index) as string;

	const baseUrl = `/phy2service/api/sifac/grupos/${id}/proveedores`;
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		// --- CONDICIONES DE PAGO ---
		case 'getCondicionesPago':
			endpoint = `${baseUrl}/condiciones-de-pagos`;
			break;
		case 'updateCondicionesPago':
			endpoint = `${baseUrl}/condiciones-de-pagos`;
			method = 'POST';
			break;

		// --- DESCUENTOS ---
		case 'getDescuentos':
			endpoint = `${baseUrl}/descuentos`;
			break;
		case 'updateDescuentos':
			endpoint = `${baseUrl}/descuentos`;
			method = 'POST';
			break;

		// --- CONEXIONES CONTABLES ---
		case 'getConexionesContables':
			endpoint = `${baseUrl}/conexiones-contables`;
			break;
		case 'updateConexionesContables':
			endpoint = `${baseUrl}/conexiones-contables`;
			method = 'POST';
			break;

		// --- TOPES DE CRÉDITO ---
		case 'getTopesCredito':
			endpoint = `${baseUrl}/topes-de-creditos`;
			break;
		case 'updateTopesCredito':
			endpoint = `${baseUrl}/topes-de-creditos`;
			method = 'POST';
			break;

		// --- VENDEDORES (COMPRADORES) ---
		case 'getVendedores':
			endpoint = `${baseUrl}/vendedores`;
			break;
		case 'updateVendedores':
			endpoint = `${baseUrl}/vendedores`;
			method = 'POST';
			break;

		// --- OBSERVACIONES ---
		case 'getObservaciones':
			endpoint = `${baseUrl}/observaciones`;
			break;
		case 'updateObservaciones':
			endpoint = `${baseUrl}/observaciones`;
			method = 'POST';
			break;

		// --- TRANSPORTES ---
		case 'getTransportes':
			endpoint = `${baseUrl}/transportes`;
			break;
		case 'updateTransportes':
			endpoint = `${baseUrl}/transportes`;
			method = 'POST';
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