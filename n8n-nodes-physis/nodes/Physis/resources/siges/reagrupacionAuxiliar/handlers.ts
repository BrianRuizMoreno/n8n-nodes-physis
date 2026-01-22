import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			const idAuxiList = this.getNodeParameter('idAuxi', index, 0) as number;
			if (idAuxiList > 0) {
				endpoint = `${baseUrl}/planes-cuentas-auxi/${idAuxiList}/reagrupaciones`;
			} else {
				endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
			}
			break;
		case 'get':
			endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
			qs = {
				idReagAuxi: id,
				idAuxi: this.getNodeParameter('idAuxi', index) as number
			};
			break;
		case 'getTotalSize':
			endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}/tamaniototal`;
			qs = { idAuxi: this.getNodeParameter('idAuxi', index) as number };
			break;
		case 'getAccounts':
			endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}/cuentas`;
			break;
		case 'getAssociatedAuxiliaries':
			const idCtaReag = this.getNodeParameter('idCtaReagAuxi', index) as string;
			endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}/cuentas/${idCtaReag}/auxiliares`;
			break;
		case 'create':
			method = 'POST';
			endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
			break;
		case 'update':
			method = 'PUT';
			endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
			break;
		case 'delete':
			method = 'DELETE';
			endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}`;
			qs = {
				idAuxi: this.getNodeParameter('idAuxi', index) as number,
				idPpal: 1
			};
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST' || method === 'PUT') {
				body = { ...body, ...json };
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