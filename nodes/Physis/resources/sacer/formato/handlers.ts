import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sacer/formatos';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};
	let idFormato = this.getNodeParameter('id', index, '') as string;
	let idTipoFormato = this.getNodeParameter('idTipoFormato', index, '') as string;

	switch (operation) {
		case 'getAll':
			break;
		case 'getByType':
			endpoint = `/phy2service/api/sacer/tipos-formato/${idTipoFormato}/formatos`;
			break;
		case 'get':
			endpoint = `/phy2service/api/sacer/tipos-formato/${idTipoFormato}/formatos/${idFormato}`;
			break;
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete':
			endpoint = `${endpoint}/${idFormato}`;
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