import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sach/lugares';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {}; 

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			break;
		case 'get':
			endpoint = `${endpoint}/${id}`;
			break;
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete':
			endpoint = `${endpoint}/${id}`;
			method = 'DELETE';
			break;
		case 'searchV2':
			endpoint = '/phy2service/api/sach/v2/lugares';
			break;
		case 'getPrefijos':
			endpoint = `${endpoint}/prefijos`;
			break;
		case 'getPartidos':
			endpoint = '/phy2service/api/sach/partidos';
			break;
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		let json: IDataObject;
		try {
			json = JSON.parse(rawJson) as IDataObject;
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}

		if (operation === 'searchV2') {
			qs.consulta = rawJson;
		} 
		else if (method === 'POST' || method === 'PUT') {
			body = json;
		} 
		else {
			qs = { ...qs, ...json };
		}
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}