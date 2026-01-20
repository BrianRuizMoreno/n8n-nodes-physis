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
		case 'checkAvailability':
			endpoint = `${baseUrl}/valores-disponibilidad-existen-comprobantes`;
			qs = {
				IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
				IdComprobante: this.getNodeParameter('idComprobante', index) as number
			};
			break;
		case 'checkNegotiated':
			endpoint = `${baseUrl}/valores-negociados-existen-comprobantes`;
			qs = {
				IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
				IdComprobante: this.getNodeParameter('idComprobante', index) as number
			};
			break;
		case 'getLastCheckNumber':
			endpoint = `${baseUrl}/valores-numero-cheque`;
			qs = {
				IdBanco: this.getNodeParameter('idBanco', index) as string,
				IdCuentaBancaria: this.getNodeParameter('idCuentaBancaria', index) as number,
				IdChequera: this.getNodeParameter('idChequera', index) as number
			};
			break;
		case 'getReceivedValues':
			endpoint = `${baseUrl}/valores-recibidos`;
			qs = {
				IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
				IdComprobante: this.getNodeParameter('idComprobante', index) as number,
				Entrega: this.getNodeParameter('entrega', index) as boolean,
				Electronico: this.getNodeParameter('electronico', index, 0) as number
			};			
			const tipoRecCau = this.getNodeParameter('tipoRecCau', index, 0) as number;
			if (tipoRecCau !== 0) {
				qs.TipoRecCau = tipoRecCau;
			}
			break;

		case 'getElectronicBatches':
			endpoint = `${baseUrl}/valores-electronicos-NumeroEnvio`;
			qs = {
				sCodBanco: this.getNodeParameter('idBanco', index) as string,
				lCuentaBancaria: this.getNodeParameter('idCuentaBancaria', index) as number,
				sTipoConsulta: this.getNodeParameter('tipoConsulta', index) as string
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