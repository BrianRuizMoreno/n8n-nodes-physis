import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/sifac';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getListas':
			endpoint = `${baseUrl}/listas-precios`;
			break;
		case 'getProductosLista':
			endpoint = `${baseUrl}/listas-precios/${id}/productos`;
			break;
		case 'getPreciosProducto':
			endpoint = `${baseUrl}/productos/${id}/precios`;
			break;
		case 'getPrecioProductoEnLista': {
			const idLista = this.getNodeParameter('idLista', index) as string;
			if (!idLista) {
				throw new Error('El parámetro "idLista" es requerido para esta operación.');
			}
			endpoint = `${baseUrl}/productos/${id}/precios/${idLista}`;
			break;
		}
		case 'getPreciosExistencia':
			endpoint = `${baseUrl}/productos/precios-existencia`;
			break;
		case 'upsertListaPrecios':
			endpoint = `${baseUrl}/productos/${id}/lista-precios`;
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