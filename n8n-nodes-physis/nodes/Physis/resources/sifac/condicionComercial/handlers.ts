import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sifac/clientes';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- CONDICIONES DE PAGO ---
		case 'getPagoArbol':
			endpoint += '/condiciones-de-pagos/arbol';
			break;
		case 'getPago':
			endpoint += `/condiciones-de-pagos/${id}`;
			break;
		case 'getPagoManuales':
			endpoint += `/condiciones-de-pagos/vencimientos-manuales/${id}`;
			break;
		case 'createPago':
			endpoint += '/condiciones-de-pagos';
			method = 'POST';
			break;
		case 'updatePago':
			endpoint += '/condiciones-de-pagos';
			method = 'PUT';
			break;
		case 'deletePago':
			endpoint += `/condiciones-de-pagos/${id}`;
			method = 'DELETE';
			break;

		// --- DESCUENTOS ---
		case 'getDescuentoArbol':
			endpoint += '/descuentos/arbol';
			break;
		case 'getDescuento':
			endpoint += `/descuentos/${id}`;
			break;
		case 'getDescuentoByAlias':
			endpoint += `/descuentos-by-alias/${id}`;
			break;
		case 'createDescuento':
			endpoint += '/descuentos';
			method = 'POST';
			break;
		case 'updateDescuento':
			endpoint += '/descuentos';
			method = 'PUT';
			break;
		case 'deleteDescuento':
			endpoint += `/descuentos/${id}`;
			method = 'DELETE';
			break;

		// --- OBSERVACIONES ---
		case 'getObservacionArbol':
			endpoint += '/observaciones/arbol';
			break;
		case 'createObservacion':
			endpoint += '/observaciones';
			method = 'POST';
			break;
		case 'updateObservacion':
			endpoint += '/observaciones';
			method = 'PUT';
			break;
		case 'deleteObservacion':
			endpoint += `/observaciones/${id}`;
			method = 'DELETE';
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