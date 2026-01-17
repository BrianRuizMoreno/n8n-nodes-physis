import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sach/compradoresremate';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {}; // Cambiado a let

	const idPuestoCarga = this.getNodeParameter('idPuestoCarga', index, '') as string;
	if (idPuestoCarga) qs.IdPuestoCarga = idPuestoCarga;

	const idRemateFeria = this.getNodeParameter('idRemateFeria', index, '') as string;
	if (idRemateFeria) qs.IdRemateFeria = idRemateFeria;

	const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '') as string;
	if (idCtaAuxi) qs.idCtaAuxi = idCtaAuxi;

	switch (operation) {
		case 'getAll':
			break;
		case 'create':
			method = 'POST';
			break;
		case 'delete':
			method = 'DELETE';
			break;
		case 'deleteAll':
			endpoint = '/phy2service/api/sach/compradoresremateall';
			method = 'DELETE';
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