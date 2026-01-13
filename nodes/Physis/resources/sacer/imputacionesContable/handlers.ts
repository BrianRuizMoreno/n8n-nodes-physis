import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	let endpoint = '/api/sacer/imputaciones-contables';
	let method = 'GET';
	let body: IDataObject = {};
	const qs: IDataObject = {};

	try {
		const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
		if (['create', 'update'].includes(operation)) {
			body = json as IDataObject;
		}
	} catch (e) {}

	if (operation === 'getAll') {
		qs.CodCereal = this.getNodeParameter('codCereal', index) as number;
		qs.CodPlanta = this.getNodeParameter('codPlanta', index) as number;
		qs.CodTipoFormulario = this.getNodeParameter('codTipoFormulario', index) as number;
		qs.CodClase = this.getNodeParameter('codClase', index) as number;
		const retenPercep = this.getNodeParameter('retenPercep', index) as number;
		if (retenPercep) qs.RetenPercep = retenPercep;
	}
	else if (operation === 'get') {
		const id = this.getNodeParameter('codImputacion', index) as string;
		endpoint = `${endpoint}/${id}`;
	}
	else if (operation === 'create') {
		method = 'POST';
	}
	else if (operation === 'update') {
		method = 'PUT';
	}
	else if (operation === 'delete') {
		const id = this.getNodeParameter('codImputacion', index) as string;
		endpoint = `${endpoint}/${id}`;
		method = 'DELETE';
	}
	else if (operation === 'getRegimenes') {
		endpoint = '/api/sacer/imputaciones-contables/regimenes';
		const idCtaPpal = this.getNodeParameter('idCtaPpal', index) as string;
		if (idCtaPpal) qs.idCtaPpal = idCtaPpal;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data)
		? data.map((item) => ({ json: item }))
		: [{ json: data as IDataObject }];
}