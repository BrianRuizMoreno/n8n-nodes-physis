import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/sach/tablasLsp';
	let method = 'GET';
	let qs: IDataObject = {}; 

	const idEspecie = this.getNodeParameter('idEspecie', index, '') as string;
	if (idEspecie) {
		qs.idEspecie = idEspecie;
	}

	switch (operation) {
		case 'getMotivos':
			endpoint = `${endpoint}/motivos`;
			break;
		case 'getEspecies':
			endpoint = `${endpoint}/especies`;
			break;
		case 'getRazas':
			endpoint = `${endpoint}/razas`;
			break;
		case 'getCategorias':
			endpoint = `${endpoint}/categorias`;
			break;
		case 'getTipoTributo':
			endpoint = `${endpoint}/tipotributo`;
			break;
		case 'getGastos':
			endpoint = `${endpoint}/gastos`;
			break;
		default:
			throw new Error(`Operación ${operation} no soportada.`);
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