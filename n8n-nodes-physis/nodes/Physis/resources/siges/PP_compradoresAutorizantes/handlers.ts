import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlCompradores = '/phy2service/api/siges/proveedores/compradores';
	const baseUrlAutorizantes = '/phy2service/api/siges/proveedores/autorizantes';
	
	let endpoint = '';
	let method = 'GET';
	let body: any = {}; 
	let qs: IDataObject = {};

	const idComprador = this.getNodeParameter('id', index, '') as string;
	const idAutorizante = this.getNodeParameter('idAutorizante', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = baseUrlCompradores;
			break;
		case 'getSettings':
			endpoint = `${baseUrlCompradores}/settings`;
			break;
		case 'saveSettings':
			endpoint = `${baseUrlCompradores}/settings`;
			method = 'POST';
			break;
		case 'getAllAutorizantes':
			endpoint = baseUrlAutorizantes;
			break;
		case 'getAutorizantes':
			endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes`;
			break;
		case 'addAutorizante':
			endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes`;
			method = 'POST';
			break;
		case 'addAutorizanteList':
			endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes-list`;
			method = 'POST';
			break;
		case 'updateAutorizante':
			endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes}/${idAutorizante}`;
			method = 'PATCH';
			break;
		case 'deleteAutorizante':
			endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes}/${idAutorizante}`;
			method = 'DELETE';
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson); 

			if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
				body = json;
			} else {
				if (!Array.isArray(json)) {
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