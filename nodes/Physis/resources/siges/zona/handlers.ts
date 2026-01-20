import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	const method = 'GET'; 
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- PAISES ---
		case 'getPaises':
			endpoint = `${baseUrl}/paises`;
			break;
		case 'getPais':
			endpoint = `${baseUrl}/paises/${id}`;
			break;

		// --- PROVINCIAS ---
		case 'getProvincias':
			endpoint = `${baseUrl}/provincias`;
			break;
		case 'getProvincia':
			endpoint = `${baseUrl}/provincias/${id}`;
			break;

		// --- ZONAS Y LUGARES ---
		case 'getZonas':
			endpoint = `${baseUrl}/zonas`;
			break;
		case 'getLugares':
			endpoint = `${baseUrl}/lugares`;
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;
			qs = { ...qs, ...json };
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}