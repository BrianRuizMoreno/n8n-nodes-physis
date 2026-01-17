import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- Plantas ---
		case 'getPlantas':
			endpoint = '/phy2service/api/sacer/plantas';
			break;
		case 'getPlanta':
			endpoint = `/phy2service/api/sacer/plantas/${id}`;
			break;
		case 'getNumeradoresPlanta':
			endpoint = `/phy2service/api/sacer/plantas/${id}/numeradores`;
			break;
		case 'createPlanta':
			endpoint = '/phy2service/api/sacer/plantas';
			method = 'POST';
			break;
		case 'updatePlanta':
			endpoint = '/phy2service/api/sacer/plantas';
			method = 'PUT';
			break;
		case 'deletePlanta':
			endpoint = `/phy2service/api/sacer/plantas/${id}`;
			method = 'DELETE';
			break;
		// --- Silos ---
		case 'getSilos':
			endpoint = '/phy2service/api/sacer/Silos';
			break;
		case 'getSilo':
			endpoint = `/phy2service/api/sacer/Silos/${id}`;
			break;
		case 'createSilo':
			endpoint = '/phy2service/api/sacer/Silos';
			method = 'POST';
			break;
		case 'updateSilo':
			endpoint = '/phy2service/api/sacer/Silos';
			method = 'PUT';
			break;
		case 'deleteSilo':
			endpoint = `/phy2service/api/sacer/Silos/${id}`;
			method = 'DELETE';
			break;
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