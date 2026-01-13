import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	let endpoint = '';
	const method = 'GET';
	const body: IDataObject = {};
	const qs: IDataObject = {};

	if (operation === 'getProductores') {
		endpoint = '/api/sacer/productores';
	}
	else if (operation === 'getCorredores') {
		endpoint = '/api/sacer/corredores';
	}
	else if (operation === 'getTransportistas') {
		endpoint = '/api/sacer/transportistas';
	}
	else if (operation === 'getByTipo') {
		const codTipoTercero = this.getNodeParameter('codTipoTercero', index);
		endpoint = `/api/sacer/tipos-tercero/${codTipoTercero}/terceros`;
	}
	else if (operation === 'getDomicilios') {
		const idAuxi = this.getNodeParameter('idAuxi', index);
		const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
		endpoint = `/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/terceros/domicilios`;
	}
	else if (operation === 'getDomicilio') {
		const idAuxi = this.getNodeParameter('idAuxi', index);
		const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
		const codDomicilio = this.getNodeParameter('codDomicilio', index);
		endpoint = `/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/terceros/domicilios/${codDomicilio}`;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data)
		? data.map((item) => ({ json: item }))
		: [{ json: data as IDataObject }];
}