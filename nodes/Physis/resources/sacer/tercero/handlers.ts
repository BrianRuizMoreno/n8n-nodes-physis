import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {}; 

	switch (operation) {
		case 'getProductores':
			endpoint = '/phy2service/api/sacer/productores';
			break;
		case 'getCorredores':
			endpoint = '/phy2service/api/sacer/corredores';
			break;
		case 'getTransportistas':
			endpoint = '/phy2service/api/sacer/transportistas';
			break;
		case 'getByTipo': {
			const codTipoTercero = this.getNodeParameter('codTipoTercero', index) as string;
			endpoint = `/phy2service/api/sacer/tipos-tercero/${codTipoTercero}/terceros`;
			break;
		}
		case 'getDomicilios': {
			const idAuxi = this.getNodeParameter('idAuxi', index) as string;
			const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
			endpoint = `/phy2service/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/terceros/domicilios`;
			break;
		}
		case 'getDomicilio': {
			const idAuxi = this.getNodeParameter('idAuxi', index) as string;
			const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
			const codDomicilio = this.getNodeParameter('codDomicilio', index) as string;
			endpoint = `/phy2service/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/terceros/domicilios/${codDomicilio}`;
			break;
		}
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

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data)
		? data.map((item) => ({ json: item }))
		: [{ json: data as IDataObject }];
}