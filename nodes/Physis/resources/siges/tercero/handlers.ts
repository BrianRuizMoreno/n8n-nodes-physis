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

	switch (operation) {
		case 'search':
			endpoint = `${baseUrl}/terceros`;
			const texto = this.getNodeParameter('texto', index, '') as string;
			const idAuxiFilter = this.getNodeParameter('idAuxiFilter', index, 0) as number;
			
			if (texto) qs.texto = texto;
			if (idAuxiFilter) qs.idAuxi = idAuxiFilter;
			break;
		case 'get':
			const idAuxiGet = this.getNodeParameter('idAuxi', index) as number;
			const idCtaAuxiGet = this.getNodeParameter('idCtaAuxi', index) as string;
			endpoint = `${baseUrl}/terceros/${idAuxiGet}/${idCtaAuxiGet}`;
			break;
		case 'getByDocument':
			endpoint = `${baseUrl}/terceros-nrodoc`;
			qs.NroDoc = this.getNodeParameter('nroDoc', index) as string;
			break;
		case 'query':
			method = 'POST';
			endpoint = `${baseUrl}/terceros/consulta`;
			break;
		case 'getAddresses':
			const idAuxiAddr = this.getNodeParameter('idAuxi', index) as number;
			const idCtaAuxiAddr = this.getNodeParameter('idCtaAuxi', index) as string;
			endpoint = `${baseUrl}/terceros/${idAuxiAddr}/${idCtaAuxiAddr}/domicilios`;
			break;
		case 'createAddress':
			method = 'POST';
			const idAuxiCreate = this.getNodeParameter('idAuxi', index) as number;
			const idCtaAuxiCreate = this.getNodeParameter('idCtaAuxi', index) as string;
			endpoint = `${baseUrl}/terceros/${idAuxiCreate}/${idCtaAuxiCreate}/domicilios`;
			
			body.idAuxi = idAuxiCreate;
			body.idCtaAuxi = idCtaAuxiCreate;
			break;
		case 'getBankAccounts':
			endpoint = `${baseUrl}/terceroscuentasbancarias`;
			break;
		case 'getContacts':
			endpoint = `${baseUrl}/terceros/contactosreagrupados`;
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