import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/sifac';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- CATÁLOGO Y BÚSQUEDA ---
		case 'getAll':
			endpoint = `${baseUrl}/productos`;
			break;
		case 'getArbol':
			endpoint = `${baseUrl}/productos/arbol`;
			break;
		case 'getConsultaGrid':
			endpoint = `${baseUrl}/productos/consultar`;
			method = 'POST';
			break;
		case 'getEstructura':
			endpoint = `${baseUrl}/productos/estructura-de-productos`;
			break;

		// --- STOCK Y EXISTENCIAS ---
		case 'getStockDisponible':
			endpoint = `${baseUrl}/productos/${id}/stock-disponible`;
			break;
		case 'getSaldos':
			endpoint = `${baseUrl}/saldos/productos/${id}`;
			break;
		case 'getPesos':
			endpoint = `${baseUrl}/productos/${id}/pesos`;
			break;

		// --- PRECIOS ---
		case 'getPrecios':
			endpoint = `${baseUrl}/precios/productos/${id}`;
			break;
		case 'updatePrecios':
			endpoint = `${baseUrl}/productos/${id}/lista-precios`;
			method = 'POST'; 
			break;
		case 'getPreciosExistencia':
			endpoint = `${baseUrl}/productos/precios-existencia`;
			break;

		// --- CONFIGURACIÓN Y BLOQUEOS ---
		case 'getSettings':
			endpoint = `${baseUrl}/productos/${id}/settings`;
			break;
		case 'blockProducto':
			endpoint = `${baseUrl}/productos/piezas/bloqueo`;
			method = 'POST';
			break;
		case 'unblockProducto':
			endpoint = `${baseUrl}/productos/piezas/desbloqueo`;
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