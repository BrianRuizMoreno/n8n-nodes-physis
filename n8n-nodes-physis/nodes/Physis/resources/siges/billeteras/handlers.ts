import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/billeteras';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'getAll':
			endpoint = baseUrl;
			break;

		case 'get':
			const idAuxi = this.getNodeParameter('idAuxi', index) as number;
			const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
			endpoint = `${baseUrl}/${idAuxi}/${idCtaAuxi}`;
			break;

		case 'getPendingMovements':
			endpoint = `${baseUrl}/movimientos-sin-informar`;
			break;

		case 'updateMovementStatus':
			endpoint = `${baseUrl}/movimientos-sin-informar`;
			method = 'PUT';
			qs = {
				idMov: this.getNodeParameter('idMov', index) as number,
				posicion: this.getNodeParameter('posicion', index) as number
			};
			break;

		case 'createOperation':
			endpoint = `${baseUrl}/bica/operaciones`;
			method = 'POST';
			break;

		case 'processDailyBalance':
			endpoint = `${baseUrl}/bica/balances/diario`;
			method = 'POST';
			break;

		case 'refreshBalances':
			endpoint = `${baseUrl}/bica/saldos`;
			method = 'POST';
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST' || method === 'PUT') {
				body = { ...body, ...json };
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