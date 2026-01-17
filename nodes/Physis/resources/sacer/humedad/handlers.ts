import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sacer/humedades';
	let method = 'GET';
	let body: IDataObject | IDataObject[] = {};
	let qs: IDataObject = {};
	let codCereal = this.getNodeParameter('codCereal', index, '') as string;
	let porcHumedad = this.getNodeParameter('porcHumedad', index, '') as string;
	let idHumedad = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = `${endpoint}/${codCereal}`;
			break;
		case 'get':
			endpoint = `${endpoint}/${codCereal}/${porcHumedad}`;
			break;
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete':
			endpoint = `/phy2service/api/sacer/humedad/${idHumedad}`;
			method = 'DELETE';
			break;
	}

	let rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson);

			if (method === 'POST' || method === 'PUT') {
				body = json;
			} else {
				if (typeof json === 'object' && !Array.isArray(json) && json !== null) {
					qs = { ...qs, ...json };
				}
			}
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	const response = await transport.request(method, endpoint, body as IDataObject, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}