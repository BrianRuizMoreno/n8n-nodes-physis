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
		case 'getAll':
			endpoint = '/phy2service/api/sacer/cartas-porte';
			break;
		case 'getGrid':
			endpoint = '/phy2service/api/sacer/v2/cartas-porte';
			const esAnulado = this.getNodeParameter('esAnulado', index, false) as boolean;
			qs.esAnulado = esAnulado;
			break;
		case 'get':
			endpoint = `/phy2service/api/sacer/cartas-porte/${id}`;
			break;
		case 'create':
			endpoint = '/phy2service/api/sacer/cartas-porte';
			method = 'POST';
			break;
		case 'getPdf':
			endpoint = `/phy2service/api/sacer/cartas-porte/${id}/pdf`;
			break;
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (operation === 'create') {
				body = json;
				if (body.grabaSavec !== undefined) {
					qs.grabaSavec = body.grabaSavec;
					delete body.grabaSavec;
				}
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