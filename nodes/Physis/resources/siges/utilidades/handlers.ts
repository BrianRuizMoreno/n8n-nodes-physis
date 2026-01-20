import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET';
	let body: any = {}; 
	let qs: IDataObject = {};

	switch (operation) {
		// --- FIRMANTES ---
		case 'listSignatories':
			endpoint = `${baseUrl}/firmantes-all`;
			break;

		// --- CONTROLES (SUBDIARIO) ---
		case 'checkSubjournalDate':
			endpoint = `${baseUrl}/subdiario-controla-fechas`;
			qs = {
				IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
				IdPpal: this.getNodeParameter('idPpal', index) as number,
				IdTipoComprobante: this.getNodeParameter('idTipoComprobante', index) as string,
				Fecha: this.getNodeParameter('fecha', index) as string
			};
			break;

		// --- IVA DEVOLUCIÓN ---
		case 'checkIvaRefundStatus':
			endpoint = `${baseUrl}/iva-devolucion-comprobantes-registrados`;
			qs = {
				IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
				IdComprobante: this.getNodeParameter('idComprobante', index) as number
			};
			break;

		// --- COMPROBANTES DE TERCERO ---
		case 'createThirdPartyVoucher':
			method = 'POST';
			endpoint = `${baseUrl}/comprobantedetercero`;
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson); 

			if (operation === 'createThirdPartyVoucher') {
				body = Array.isArray(json) ? json : [json];
			} 
			else if (method === 'POST' || method === 'PUT') {
				body = json;
			} 
			else {
				if (typeof json === 'object' && !Array.isArray(json) && json !== null) {
					qs = { ...qs, ...json };
				}
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