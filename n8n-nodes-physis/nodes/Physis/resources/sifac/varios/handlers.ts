import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlSifac = '/phy2service/api/sifac';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;
	const idAuxi = this.getNodeParameter('idAuxi', index, '') as string;

	switch (operation) {
		// --- 1. CONCEPTOS ---
		case 'getConceptos':
			endpoint = `${baseUrlSifac}/conceptos`;
			break;

		// --- 2. CONSULTAS TERCEROS ---
		case 'consultaTerceros':
			endpoint = `${baseUrlSifac}/consultas/terceros`;
			break;

		// --- 3. GRUPOS CUENTAS AUXILIARES ---
		case 'getGrupoCuentas':
			if (!id || !idAuxi) throw new Error('Los campos "ID Grupo" e "ID Auxi" son obligatorios para esta operación.');
			endpoint = `${baseUrlSifac}/grupos/${id}/planes-de-cuentas-auxiliares/${idAuxi}/cuentas-auxiliares`;
			break;

		case 'updateGrupoCuentas':
			if (!id || !idAuxi) throw new Error('Los campos "ID Grupo" e "ID Auxi" son obligatorios para esta operación.');
			endpoint = `${baseUrlSifac}/grupos/${id}/planes-de-cuentas-auxiliares/${idAuxi}/cuentas-auxiliares`;
			method = 'POST';
			break;

		default:
			throw new Error(`La operación "${operation}" no está soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (operation === 'consultaTerceros') {
				if (Object.keys(json).length > 0) {
					qs = {
						consulta: JSON.stringify(json)
					};
				}
			} else if (method === 'POST' || method === 'PUT') {
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