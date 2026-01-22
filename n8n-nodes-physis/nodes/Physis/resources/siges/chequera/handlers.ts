import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/chequeras';
	let endpoint = baseUrl;
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const idChequera = this.getNodeParameter('idChequera', index, '') as string;
	const idBanco = this.getNodeParameter('idBanco', index, '') as string;
	const idCuenta = this.getNodeParameter('idCuentasBancarias', index, '') as string;

	switch (operation) {
		case 'getAll':
			break;
		case 'get':
			endpoint = `${baseUrl}/${idChequera}/${idBanco}/${idCuenta}`;
			break;
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete':
			method = 'DELETE';
			break;
		case 'getNext':
			endpoint = '/phy2service/api/siges/chequeras-proximo-id';
			break;
		case 'getByFiltroElectronico':
			endpoint = '/phy2service/api/siges/chequeras-defecto-filtro-electronico';
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

	if (operation === 'delete') {
		if (idChequera) qs.idChequera = idChequera;
		if (idBanco) qs.idBanco = idBanco;
		if (idCuenta) qs.idCuentaCte = idCuenta; 
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}