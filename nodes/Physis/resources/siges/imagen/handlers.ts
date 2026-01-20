import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlImages = '/phy2service/api/siges/comprobantes/imagenes';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {}; 
	let qs: IDataObject = {};

	let idImagen = this.getNodeParameter('id', index, '') as string;
	let idEjercicio = this.getNodeParameter('idEjercicio', index, '') as string;
	let idComprobante = this.getNodeParameter('idComprobante', index, '') as string;
	let idSecuencia = this.getNodeParameter('idSecuencia', index, '') as string;

	switch (operation) {
		// --- CRUD IMÁGENES ---
		case 'getAll':
			endpoint = baseUrlImages;
			break;
		case 'get':
			endpoint = `${baseUrlImages}/${idImagen}`;
			break;
		case 'create':
			endpoint = baseUrlImages;
			method = 'POST';
			break;
		case 'update':
			endpoint = baseUrlImages;
			method = 'PUT';
			break;
		case 'delete':
			endpoint = baseUrlImages;
			method = 'DELETE';
			break;

		// --- PDFS y CERTIFICADOS ---
		case 'getPdfComprobante':
			endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdf`;
			break;
		case 'getPdfAfip':
			endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdfAfip`;
			break;
		case 'getPdfOprc':
			endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdfOprc`;
			break;
		case 'getCertificadosList':
			endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/certificados`;
			break;
		case 'getPdfCertificado':
			endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/certificados/${idSecuencia}/pdf`;
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

	if (['getAll', 'get', 'create', 'update', 'delete'].includes(operation)) {
		if (idEjercicio) qs.IdEjercicio = idEjercicio;
		if (idComprobante) qs.IdComprobante = idComprobante;
		
		if ((operation === 'update' || operation === 'delete') && idImagen) {
			qs.IdImagen = idImagen;
		}
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}