import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sifac';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- CONTROLES ADICIONALES (CRUD) ---
		case 'getAll':
			endpoint += '/controles-adicionales';
			break;
		case 'get':
			endpoint += `/controles-adicionales/${id}`;
			break;
		case 'create':
			endpoint += '/controles-adicionales';
			method = 'POST';
			break;
		case 'update':
			endpoint += `/controles-adicionales/${id}`;
			method = 'PUT';
			break;
		case 'delete':
			endpoint += `/controles-adicionales/${id}`;
			method = 'DELETE';
			break;

		// --- CONDUCTORES ---
		case 'getConductorAll':
			endpoint += '/conductores/controles-adicionales';
			break;
		case 'getConductor':
			endpoint += `/conductores/${id}/controles-adicionales`;
			break;
		case 'assignConductor':
			endpoint += `/conductores/${id}/controles-adicionales`;
			method = 'POST';
			break;
		case 'updateConductor':
			endpoint += `/conductores/${id}/controles-adicionales`;
			method = 'PUT';
			break;
		case 'clearConductor':
			endpoint += `/conductores/${id}/controles-adicionales`;
			method = 'DELETE';
			break;
		case 'removeConductorControl': {
			const idCtrlC = this.getNodeParameter('idControlAdicional', index) as string;
			endpoint += `/conductores/${id}/controles-adicionales/${idCtrlC}`;
			method = 'DELETE';
			break;
		}

		// --- MEDIOS DE TRANSPORTE ---
		case 'getMedioAll':
			endpoint += '/medios-transporte/controles-adicionales';
			break;
		case 'getMedio':
			endpoint += `/medios-transporte/${id}/controles-adicionales`;
			break;
		case 'assignMedio':
			endpoint += `/medios-transporte/${id}/controles-adicionales`;
			method = 'POST';
			break;
		case 'updateMedio':
			endpoint += `/medios-transporte/${id}/controles-adicionales`;
			method = 'PUT';
			break;
		case 'clearMedio':
			endpoint += `/medios-transporte/${id}/controles-adicionales`;
			method = 'DELETE';
			break;
		case 'removeMedioControl': {
			const idCtrlM = this.getNodeParameter('idControlAdicional', index) as string;
			endpoint += `/medios-transporte/${id}/controles-adicionales/${idCtrlM}`;
			method = 'DELETE';
			break;
		}

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