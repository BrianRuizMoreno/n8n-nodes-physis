import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const idCabecera = this.getNodeParameter('idCabecera', index, '') as string;
	const idMovimiento = this.getNodeParameter('idMovimiento', index, '') as string;

	switch (operation) {
		// --- COMPROBANTES ---
		case 'getCabeceras':
			endpoint = '/phy2service/api/sifac/comprobantes/cabeceras';
			break;
		case 'getConsultaGrid':
			endpoint = '/phy2service/api/sifac/comprobantes/consulta';
			method = 'POST';
			break;
		case 'create':
			endpoint = '/phy2service/api/sifac/comprobantes';
			method = 'POST';
			break;

		// --- AUTORIZACIONES ---
		case 'getAutorizacionGrid':
			endpoint = '/phy2service/api/sifac/comprobantes/items/autorizacion/consultas';
			method = 'POST';
			break;
		case 'authorizeItem':
			endpoint = `/phy2service/api/sifac/comprobantes/${idCabecera}/items/${idMovimiento}/autorizacion`;
			method = 'PATCH';
			break;
			
		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (['POST', 'PUT', 'PATCH'].includes(method)) {
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