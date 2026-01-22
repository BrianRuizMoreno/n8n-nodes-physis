import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	// ===============================================================
	// ENRUTAMIENTO
	// ===============================================================

	switch (operation) {
		case 'search':
			endpoint = '/phy2service/api/sach/ajustes/busqueda';
			break;
		case 'getCuentas':
			endpoint = '/phy2service/api/sach/ajustes/ctas-ppal';
			break;
		case 'getTiposFinanciero':
			endpoint = '/phy2service/api/sach/ajustes/tipos-comprobantes/financiero';
			break;
		case 'getTiposFisicoMonetario':
			endpoint = '/phy2service/api/sach/ajustes/tipos-comprobantes/fisico-monetario';
			break;
		case 'getGastosFinanciero':
			endpoint = '/phy2service/api/sach/ajustes/gastos/financiero';
			break;
		case 'getGastosFisicoMonetario':
			endpoint = '/phy2service/api/sach/ajustes/gastos/fisico-monetario';
			break;
		case 'getTributosFinanciero':
			endpoint = '/phy2service/api/sach/ajustes/tributos/financiero';
			break;
		case 'getFinanciero':
			endpoint = '/phy2service/api/sach/ajustes/financiero/consulta';
			break;
		case 'getFisico':
			endpoint = '/phy2service/api/sach/ajustes/fisico/consulta';
			break;
		case 'createFinanciero':
			endpoint = '/phy2service/api/sach/ajustes/financiero';
			method = 'POST';
			break;
		case 'emitirFisicoMonetario':
			endpoint = '/phy2service/api/sach/ajustes/emision';
			break;
		case 'emitirFinalFisicoMonetario':
			endpoint = '/phy2service/api/sach/ajustes/emision-final';
			break;
		case 'getComprobanteTemp':
			endpoint = '/phy2service/api/sach/ajustes/comprobante';
			break;
		case 'getGastosComprobante':
			endpoint = '/phy2service/api/sach/ajustes/gastos-comprobante';
			break;
		case 'getVencimientosComprobante':
			endpoint = '/phy2service/api/sach/ajustes/vencimientos-comprobante';
			break;
		case 'saveGastosTemp':
			endpoint = '/phy2service/api/sach/ajustes/gastos-vencimientos-temp';
			method = 'POST';
			break;
		case 'getComprobanteGridFinanciero':
			endpoint = '/phy2service/api/sach/ajustes/financiero/comprobante';
			break;
		case 'getComprobanteGridFisico':
			endpoint = '/phy2service/api/sach/ajustes/fisico/comprobante';
			break;
		default:
			throw new Error(`Operación "${operation}" no soportada en Ajustes SACH.`);
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