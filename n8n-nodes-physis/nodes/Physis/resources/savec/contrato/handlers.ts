import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/savec';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const nroContrato = this.getNodeParameter('nroContrato', index, '') as string;
	const codCampania = this.getNodeParameter('codCampania', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = `${endpoint}/contratos`;
			break;
		case 'create':
			endpoint = `${endpoint}/contratos`;
			method = 'POST';
			break;
		case 'get':
			endpoint = `${endpoint}/campanias/${codCampania}/contratos/${nroContrato}`;
			break;
		case 'getContratosTerceros':
			endpoint = `${endpoint}/contratosTerceros`;
			break;
		case 'getCorredores':
			endpoint = `${endpoint}/contrato-corredores`;
			break;
		case 'getEntregadores':
			endpoint = `${endpoint}/entregadores`;
			break;
		case 'getTransportistas':
			endpoint = `${endpoint}/transportistas`;
			break;
		case 'getTerceros':
			endpoint = `${endpoint}/terceros`;
			break;
		case 'getMonedas':
			endpoint = `${endpoint}/monedas`;
			break;
		default:
			throw new Error(`Operación ${operation} no soportada.`);
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