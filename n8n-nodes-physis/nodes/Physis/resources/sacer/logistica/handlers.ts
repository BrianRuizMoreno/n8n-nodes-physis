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
		// --- Conductores ---
		case 'getConductores':
			endpoint = '/phy2service/api/sacer/conductores';
			break;
		case 'getConductoresGrid':
			endpoint = '/phy2service/api/sacer/v2/conductores';
			break;
		case 'getConductor':
			endpoint = `/phy2service/api/sacer/conductores/${id}`;
			break;
		case 'getConductoresTransportista':
			endpoint = `/phy2service/api/sacer/transportistas/${id}/${idCtaAuxi}/conductores`;
			break;
		case 'createConductor':
			endpoint = '/phy2service/api/sacer/Conductores';
			method = 'POST';
			break;
		case 'updateConductor':
			endpoint = '/phy2service/api/sacer/Conductores';
			method = 'PUT';
			break;
		case 'deleteConductor':
			endpoint = `/phy2service/api/sacer/Conductores/${id}`;
			method = 'DELETE';
			break;
		// --- Tarifas ---
		case 'getTarifas':
			endpoint = '/phy2service/api/sacer/tarifas';
			break;
		case 'getTarifasGrid':
			endpoint = '/phy2service/api/sacer/v2/tarifas';
			break;
		case 'getTarifa':
			endpoint = `/phy2service/api/sacer/tarifas/${id}`;
			break;
		case 'createTarifa':
			endpoint = '/phy2service/api/sacer/tarifas';
			method = 'POST';
			break;
		case 'updateTarifa':
			endpoint = '/phy2service/api/sacer/tarifas';
			method = 'PUT';
			break;
		case 'deleteTarifa':
			endpoint = `/phy2service/api/sacer/tarifas/${id}`;
			method = 'DELETE';
			break;
		case 'getImputacionesTarifa':
			endpoint = `/phy2service/api/sacer/tarifas/${id}/imputaciones`;
			break;
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