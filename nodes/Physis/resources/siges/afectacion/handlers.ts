import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET'; 
	let qs: IDataObject = {};

	switch (operation) {
		case 'getPending':
			endpoint = `${baseUrl}/afectacion/cabeceras`;
			
			const estadoPending = this.getNodeParameter('estado', index) as number;
			const signoPending = this.getNodeParameter('signo', index) as number;
			const comprobantePending = this.getNodeParameter('comprobante', index, '') as string;

			qs = {
				Estado: estadoPending,
				Signo: signoPending
			};
			
			if (comprobantePending) {
				qs.Comprobante = comprobantePending;
			}
			break;

		case 'getAffectedDetails':
			endpoint = `${baseUrl}/afectacion/comprobanteafectado`;
			
			const estadoDetails = this.getNodeParameter('estado', index) as number;
			const signoDetails = this.getNodeParameter('signo', index) as number;
			const comprobanteDetails = this.getNodeParameter('comprobante', index) as string;

			qs = {
				Comprobante: comprobanteDetails,
				Estado: estadoDetails,
				Signo: signoDetails
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