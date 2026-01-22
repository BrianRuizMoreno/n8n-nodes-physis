import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	const method = 'GET'; 
	let qs: IDataObject = {};

	switch (operation) {
		case 'get':
			endpoint = `${baseUrl}/interdepositos`;
			qs = {
				IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
				IdComprobante: this.getNodeParameter('idComprobante', index) as number
			};
			break;
		case 'getNextId':
			endpoint = `${baseUrl}/interdepositos-nextid`;
			break;
		case 'getMeans':
			endpoint = `${baseUrl}/interdepositos-medios`;
			qs = {
				CodMedio: this.getNodeParameter('codMedio', index) as string,
				Exportable: this.getNodeParameter('exportable', index) as boolean
			};
			break;
		case 'getAllMeans':
			endpoint = `${baseUrl}/interdepositos-medios/all`;
			qs = {
				CodMedio: this.getNodeParameter('codMedio', index) as string
			};
			break;
		case 'getLastExportDate':
			endpoint = `${baseUrl}/interdepositos-ultimafecha`;
			break;
		case 'getShipmentNumbers':
			endpoint = `${baseUrl}/interdepositos-numerosenvio`;
			qs = {
				fecha: this.getNodeParameter('fecha', index) as string
			};
			break;
		case 'getByDateAndShipment':
			endpoint = `${baseUrl}/interdepositos-Fecha-numeroenvio`;
			qs = {
				fecha: this.getNodeParameter('fecha', index) as string,
				NumeroEnvio: this.getNodeParameter('numeroEnvio', index) as number
			};
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