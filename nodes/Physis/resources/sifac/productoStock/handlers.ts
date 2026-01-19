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
	const idDeposito = this.getNodeParameter('idDeposito', index, '') as string;

	switch (operation) {
		// --- CONSULTAS DE STOCK ---
		case 'getStock':
			endpoint = `${baseUrl}/productos/${id}/stock`;
			break;
		case 'getStockByDeposito':
			if (idDeposito && id) {
				endpoint = `${baseUrl}/depositos/${idDeposito}/productos/${id}/stock`;
			} else if (idDeposito) {
				endpoint = `${baseUrl}/depositos/${idDeposito}/productos`;
			} else {
				endpoint = `${baseUrl}/depositos/productos/stock`;
			}
			break;
		case 'getStockDisponible':
			endpoint = `${baseUrl}/productos/${id}/stock-disponible`;
			break;
		case 'getSaldos':
			endpoint = `${baseUrl}/saldos/productos/${id}`;
			break;
		case 'getPesos':
			endpoint = `${baseUrl}/productos/${id}/pesos`;
			break;
		case 'getMovimientos':
			endpoint = `${baseUrl}/productos/${id}/stock/movimientos`;
			break;

		// --- MOVIMIENTOS Y FIRMAS ---
		case 'createMovimiento':
			endpoint = `${baseUrl}/productos/stock/movimientos`;
			method = 'POST';
			break;
		case 'updateMovimiento':
			endpoint = `${baseUrl}/productos/stock/movimientos`;
			method = 'PATCH'; 
			break;
		case 'createFirma': {
			const idCab = this.getNodeParameter('idCabecera', index) as string;
			const idFirma = this.getNodeParameter('idFirma', index) as string;
			if (!idCab || !idFirma) {
				throw new Error('Se requieren "idCabecera" e "idFirma" para esta operación.');
			}
			endpoint = `${baseUrl}/productos/stock/movimientos/${idCab}/firmas/${idFirma}`;
			method = 'POST';
			break;
		}

		// --- BÚSQUEDAS Y OTROS ---
		case 'search':
			endpoint = `${baseUrl}/productos`;
			break;
		case 'searchAdvanced':
			endpoint = `${baseUrl}/productos/consultar`;
			method = 'POST';
			break;
		case 'getArbol':
			endpoint = `${baseUrl}/productos/arbol`;
			break;
		case 'getSettings':
			endpoint = `${baseUrl}/productos/${id}/settings`;
			break;
		case 'getStructure':
			endpoint = `${baseUrl}/productos/estructura-de-productos`;
			break;
		case 'bloqueo':
			endpoint = `${baseUrl}/productos/piezas/bloqueo`;
			method = 'POST';
			break;
		case 'desbloqueo':
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

			if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
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