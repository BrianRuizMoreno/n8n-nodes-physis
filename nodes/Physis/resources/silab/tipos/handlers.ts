import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/silab';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- TIPOS ---
		case 'getAllTipos':
			endpoint = `${baseUrl}/tipos`;
			break;
		case 'getTipo':
			endpoint = `${baseUrl}/tipos/${id}`;
			break;
		case 'createTipo':
			endpoint = `${baseUrl}/tipos`;
			method = 'POST';
			break;
		case 'updateTipo':
			endpoint = `${baseUrl}/tipos`;
			method = 'PUT';
			break;
		case 'deleteTipo':
			endpoint = `${baseUrl}/tipos`;
			method = 'DELETE';
			break;

		// --- TIPOS FORMULARIO ---
		case 'getAllTiposFormulario':
			endpoint = `${baseUrl}/tipos-formulario`;
			break;
		case 'getTipoFormulario':
			endpoint = `${baseUrl}/tipos-formulario/${id}`;
			break;
		case 'updateTipoFormulario':
			endpoint = `${baseUrl}/tipos-formulario`;
			method = 'PUT';
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

	if (operation === 'deleteTipo' && id) {
		qs.sigla = id;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}