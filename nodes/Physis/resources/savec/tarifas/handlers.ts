import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	let endpoint = '/phy2service/api/savec';
	let method = 'GET';
	let body: IDataObject | IDataObject[] = [];
	let qs: IDataObject = {};

	try {
		if (['getCosechero', 'deleteCosechero', 'getSecado', 'deleteSecado'].includes(operation)) {
			const codCereal = this.getNodeParameter('codCereal', index) as number;
			qs.codCereal = codCereal;
		}

		if (['getCosechero', 'deleteCosechero'].includes(operation)) {
			const codCampo = this.getNodeParameter('codCampo', index) as number;
			qs.codCampo = codCampo;
		}

		if (['getSecado', 'deleteSecado'].includes(operation)) {
			const codPlanta = this.getNodeParameter('codPlanta', index) as number;
			qs.codPlanta = codPlanta;
		}

		if (['createCosechero', 'createSecado'].includes(operation)) {
			const json = JSON.parse(this.getNodeParameter('jsonBody', index, '[]') as string);
			body = json as IDataObject[];
			method = 'POST';
		}
	} catch (e) {}

	switch (operation) {
		case 'getCosechero':
			endpoint = `${endpoint}/tarifas-cosechero`;
			break;
		case 'createCosechero':
			endpoint = `${endpoint}/tarifas-cosechero`;
			break;
		case 'deleteCosechero':
			endpoint = `${endpoint}/tarifas-cosechero`;
			method = 'DELETE';
			break;
			
		case 'getSecado':
			endpoint = `${endpoint}/tarifa-secado`;
			break;
		case 'createSecado':
			endpoint = `${endpoint}/tarifa-secado`;
			break;
		case 'deleteSecado':
			endpoint = `${endpoint}/tarifa-secado`;
			method = 'DELETE';
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const response = await transport.request(method, endpoint, body as unknown as IDataObject, qs) as IDataObject;
	
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}