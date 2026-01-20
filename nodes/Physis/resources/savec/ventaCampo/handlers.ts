import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/savec';
	const method = 'GET';
	const body: IDataObject = {};
	let qs: IDataObject = {};

	switch (operation) {
		case 'getCampos':
			endpoint = `${endpoint}/campos`;
			break;
		case 'getTiposComprobantes':
			endpoint = `${endpoint}/tipos-comprobantes`;
			break;
		case 'getCorredores':
			endpoint = `${endpoint}/corredores`;
			break;
		case 'getCompradores':
			endpoint = `${endpoint}/compradores`;
			break;
		case 'getLiquidaciones':
			endpoint = `${endpoint}/liquidaciones`;
			break;
		case 'getCartasPorte':
			endpoint = `${endpoint}/cartas-porte`;
			break;
		case 'getVentas':
			endpoint = `${endpoint}/ventas-campo`;
			break;
		case 'getVentasDetallado':
			endpoint = `${endpoint}/ventas-campo-detallado`;
			break;
		case 'getEmpresa':
			endpoint = `${endpoint}/empresa`;
			break;
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

	if (['getLiquidaciones', 'getCartasPorte'].includes(operation)) {
		if (!qs.filtro && Object.keys(qs).length > 0) {
			qs = { filtro: JSON.stringify(qs) };
		}
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}