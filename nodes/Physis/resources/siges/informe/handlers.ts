import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET'; 
	let qs: IDataObject = {};

	const idComprobante = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = `${baseUrl}/informes`;
			break;
		case 'getPdfValores':
			endpoint = `${baseUrl}/informes/valores`;
			break;
		case 'getPdfAfectaciones':
			endpoint = `${baseUrl}/informes/afectaciones`;
			break;			
		case 'getResumenCuenta':
			endpoint = `${baseUrl}/resumen-de-cuenta`;
			break;
		case 'getDetalleAfectacion':
			endpoint = `${baseUrl}/resumen-de-cuenta/afectacion/${idComprobante}`;
			break;
		case 'getInfoComercial':
			endpoint = `${baseUrl}/resumen-de-cuenta/inf-comercial`;
			break;
			
		case 'getComposicionSaldos':
			endpoint = `${baseUrl}/composicion-saldos`;
			break;
		case 'getComposicionSaldosReagrupados':
			endpoint = `${baseUrl}/composicion-saldos-reagrupados`;
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;
			qs = { ...qs, ...json };
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}