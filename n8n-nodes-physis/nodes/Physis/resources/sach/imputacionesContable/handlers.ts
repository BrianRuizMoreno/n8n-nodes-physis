import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sacer/imputaciones-contables';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {}; 

	switch (operation) {
		case 'getAll':
			qs.CodCereal = this.getNodeParameter('codCereal', index) as number;
			qs.CodPlanta = this.getNodeParameter('codPlanta', index) as number;
			qs.CodTipoFormulario = this.getNodeParameter('codTipoFormulario', index) as number;
			qs.CodClase = this.getNodeParameter('codClase', index) as number;
			
			const retenPercep = this.getNodeParameter('retenPercep', index, 0) as number;
			if (retenPercep) qs.RetenPercep = retenPercep;
			break;

		case 'get': {
			const id = this.getNodeParameter('codImputacion', index, '') as string;
			endpoint = `${endpoint}/${id}`;
			break;
		}
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete': {
			const id = this.getNodeParameter('codImputacion', index, '') as string;
			endpoint = `${endpoint}/${id}`;
			method = 'DELETE';
			break;
		}
		case 'getRegimenes':
			endpoint = '/phy2service/api/sacer/imputaciones-contables/regimenes';
			const idCtaPpal = this.getNodeParameter('idCtaPpal', index, '') as string;
			if (idCtaPpal) qs.idCtaPpal = idCtaPpal;
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