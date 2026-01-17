import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sach/remates';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	// ===============================================================
	// ENRUTAMIENTO (Switch Centralizado)
	// ===============================================================
	switch (operation) {
		// --- Remates Generales ---
		case 'getAllRemates':
			break;
		case 'getRemate':
			endpoint = `${endpoint}/${id}`;
			break;
		case 'getRemateCorrales':
			endpoint = `${endpoint}/${id}/corrales`;
			break;

		// --- Descargas (Boletas de Descarga) ---
		case 'getAllDescargas':
			endpoint = '/phy2service/api/sach/boletas-de-descarga';
			break;
		case 'getDescarga':
			endpoint = `/phy2service/api/sach/boletas-de-descarga/${id}`;
			break;
		case 'createDescarga':
			endpoint = '/phy2service/api/sach/boletas-de-descarga';
			method = 'POST';
			break;
		case 'deleteDescarga':
			endpoint = '/phy2service/api/sach/boletas-de-descarga';
			method = 'DELETE';
			break;
		case 'getPendientesEmbretar':
			endpoint = '/phy2service/api/sach/boletas-de-descarga/pendientes-de-embretar';
			break;

		// --- Imágenes de Descarga ---
		case 'getImagenesDescarga':
			endpoint = '/phy2service/api/sach/boletas-de-descarga/imagenes';
			break;
		case 'getImagenDescarga':
			endpoint = `/phy2service/api/sach/boletas-de-descarga/imagenes/${id}`;
			break;
		case 'saveImagen':
			endpoint = '/phy2service/api/sach/boletas-de-descarga/imagenes';
			method = 'POST';
			break;
		case 'updateImagen':
			endpoint = '/phy2service/api/sach/boletas-de-descarga/imagenes';
			method = 'PUT';
			break;
		case 'deleteImagen':
			endpoint = '/phy2service/api/sach/boletas-de-descarga/imagenes';
			method = 'DELETE';
			break;

		// --- Corrales ---
		case 'getAllCorrales':
			endpoint = '/phy2service/api/sach/corrales';
			break;
		case 'getCorral':
			endpoint = `/phy2service/api/sach/corrales/${id}`;
			break;

		// --- Embretes ---
		case 'getAllEmbretes':
			endpoint = '/phy2service/api/sach/embretes';
			break;
		case 'getEmbrete':
			endpoint = `/phy2service/api/sach/embretes/${id}`;
			break;
		case 'getEmbretesConsulta':
			endpoint = '/phy2service/api/sach/embretes/consulta';
			break;
		case 'createEmbrete':
			endpoint = '/phy2service/api/sach/embretes';
			method = 'POST';
			break;
		case 'deleteEmbrete':
			endpoint = '/phy2service/api/sach/embretes';
			method = 'DELETE';
			break;

		// --- Orden de Venta ---
		case 'getOrdenVenta':
			endpoint = '/phy2service/api/sach/ordendeventa';
			break;
		case 'generateOrdenVenta':
			endpoint = '/phy2service/api/sach/ordendeventa';
			method = 'POST';
			break;
		case 'saveOrdenEmbrete':
			endpoint = '/phy2service/api/sach/ordendeventa';
			method = 'PUT';
			break;

		// --- Boletas de Remate ---
		case 'getRematesPendientes':
			endpoint = '/phy2service/api/sach/boletas-de-remate/pendientes';
			break;
		case 'getRematesComprados':
			endpoint = '/phy2service/api/sach/boletas-de-remate/compradas';
			break;
		case 'getBoletaRemate':
			endpoint = `/phy2service/api/sach/boletas-de-remate/${id}`;
			break;
		case 'createBoletaRemate':
			endpoint = '/phy2service/api/sach/boletas-de-remate';
			method = 'POST';
			break;
		case 'deleteBoletaRemate':
			endpoint = '/phy2service/api/sach/boletas-de-remate';
			method = 'DELETE';
			break;
		case 'updateKilosRemate':
			endpoint = '/phy2service/api/sach/boletas-de-remate-kilos';
			method = 'PUT';
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