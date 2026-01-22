import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '';
	const method = 'GET';
	let qs: IDataObject = {}; 

	switch (operation) {
		case 'getComisionesComprobante':
			endpoint = '/phy2service/api/sach/comisiones/comisiones-de-comprobante';
			break;
		case 'getComisionesDevengadas':
			endpoint = '/phy2service/api/sach/comisionesdevengadas';
			break;
		case 'getResumenOperaciones':
			endpoint = '/phy2service/api/sach/resumen-de-operaciones';
			break;
		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const idComprobante = this.getNodeParameter('idComprobante', index, '') as string;
	if (idComprobante) {
		qs.IdComprobante = idComprobante;
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