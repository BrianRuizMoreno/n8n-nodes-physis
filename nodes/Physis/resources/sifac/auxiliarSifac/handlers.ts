import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sifac';
	let method = 'GET'; 
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getParametros':
			endpoint = `${endpoint}/parametros`;
			break;
		case 'getParametro':
			endpoint = `${endpoint}/parametros/${id}`;
			break;
		case 'getParametrosFacturaMostrador':
			endpoint = `${endpoint}/parametros-factura-mostrador`;
			break;
		case 'getModulos':
			endpoint = `${endpoint}/modulos`;
			break;
		case 'getReagrupacionesDefault':
			const idAuxi = this.getNodeParameter('idAuxi', index) as string;
			const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
			
			if (!idAuxi || !idCtaAuxi) {
				throw new Error('Los parámetros idAuxi e idCtaAuxi son requeridos para esta operación.');
			}
			endpoint = `${endpoint}/terceros/${idAuxi}/${idCtaAuxi}/reagrupaciones-default`;
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