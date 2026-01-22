import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/reagrupacioncuentasrelaciondePrincipal';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'getDetail':
			endpoint = baseUrl;
			break;
		case 'getSelected':
			endpoint = `${baseUrl}-selec`;
			break;
		case 'getAvailable':
			endpoint = `${baseUrl}-disponible`;
			break;
		case 'getAvailableTree':
			endpoint = `${baseUrl}-disponible/arbol`;
			break;
		case 'create':
			endpoint = '/phy2service/api/siges/reagrupacioncuentasrelaciondePpal-ppales';
			method = 'POST';
			break;
		case 'createDirect':
			endpoint = '/phy2service/api/siges/reagrupaciones-ppales';
			method = 'POST';
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST') {
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