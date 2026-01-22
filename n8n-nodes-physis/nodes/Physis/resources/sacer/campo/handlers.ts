import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);

	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;
	const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '') as string;

	switch (operation) {
		case 'getArbol':
			endpoint = '/phy2service/api/sacer/zonas-establecimientos-campos-lotes/arbol';
			if (id) qs.IdAuxi = id;
			if (idCtaAuxi) qs.IdCtaAuxi = idCtaAuxi;
			break;
		case 'getCampos':
			endpoint = '/phy2service/api/sacer/campos';
			break;
		case 'getCampo':
			endpoint = `/phy2service/api/sacer/campos/${id}`;
			break;
		case 'createCampo':
			endpoint = '/phy2service/api/sacer/campos';
			method = 'POST';
			break;
		case 'updateCampo':
			endpoint = '/phy2service/api/sacer/campos';
			method = 'PUT';
			break;
		case 'deleteCampo':
			endpoint = `/phy2service/api/sacer/campos/${id}`;
			method = 'DELETE';
			break;
		case 'getEstablecimientos':
			endpoint = '/phy2service/api/sacer/establecimientos';
			break;
		case 'getEstablecimiento':
			endpoint = `/phy2service/api/sacer/terceros/establecimientos/${id}`;
			break;
		case 'getEstablecimientosTercero':
			endpoint = `/phy2service/api/sacer/terceros/${id}/${idCtaAuxi}/establecimientos`;
			break;
		case 'createEstablecimiento':
			endpoint = '/phy2service/api/sacer/establecimientos';
			method = 'POST';
			break;
		case 'updateEstablecimiento':
			endpoint = '/phy2service/api/sacer/establecimientos';
			method = 'PUT';
			break;
		case 'deleteEstablecimiento':
			endpoint = `/phy2service/api/sacer/Establecimientos/${id}`;
			method = 'DELETE';
			break;
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const parsedJson = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST' || method === 'PUT') {
				body = parsedJson;
			} else {
				qs = { ...qs, ...parsedJson };
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