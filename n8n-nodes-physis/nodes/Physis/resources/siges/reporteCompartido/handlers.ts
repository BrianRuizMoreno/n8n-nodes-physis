import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlReportes = '/phy2service/api/siges/reportes-compartidos';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;
	const link = this.getNodeParameter('link', index, '') as string;

	switch (operation) {
		// --- REPORTES COMPARTIDOS ---
		case 'getAll':
			endpoint = baseUrlReportes;
			break;
		case 'get':
			endpoint = `${baseUrlReportes}/${id}`;
			break;
		case 'delete':
			endpoint = `${baseUrlReportes}/${id}`;
			method = 'DELETE';
			break;
		case 'getPdf':
			endpoint = `${baseUrlReportes}/${id}/pdf`;
			break;
		case 'getUsuarios':
			endpoint = `${baseUrlReportes}/${id}/usuarios`;
			break;
		case 'getGrupos':
			endpoint = `${baseUrlReportes}/grupos`;
			break;
		// --- DOCUMENTOS PDF / COMPROBANTES ---
		case 'getComprobantePdf':
			endpoint = '/phy2service/api/siges/comprobantepdf';
			break;
		case 'getDocumentoPdfByLink':
			endpoint = `/phy2service/api/siges/documentospdf/${link}`;
			break;
		case 'generateDocumentosPdf':
			endpoint = '/phy2service/api/siges/documentospdf';
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

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}