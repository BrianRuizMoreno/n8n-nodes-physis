import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlBancarias = '/phy2service/api/siges/cuentas-corrientes-bancarias';
	const baseUrlGenerica = '/phy2service/api/siges/cuentas-corrientes';
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = baseUrlBancarias;
			break;
		case 'get':
			endpoint = `${baseUrlBancarias}/${id}`;
			break;		
		case 'insert':
			endpoint = `${baseUrlGenerica}/insert`;
			break;
		case 'update':
			endpoint = `${baseUrlGenerica}/update`;
			break;
		case 'delete':
			endpoint = baseUrlGenerica;
			method = 'DELETE';
			break;

		case 'getArbol':
			endpoint = `${baseUrlGenerica}/arbol`;
			break;
		case 'getMedios':
			endpoint = `${baseUrlBancarias}/medios`;
			break;
		case 'getMediosDesc':
			endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-medios';
			break;
		case 'getMediosPorBanco':
			endpoint = `/phy2service/api/siges/cuentas-corrientes-bancarias-medios/%IDBANCO%`;
			break;
		case 'getExportaOP':
			endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-ExportaOP';
			break;
		case 'getFiltroElectronico':
			endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-defecto-filtro-electronico';
			break;
		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (['insert', 'update'].includes(operation)) {
				qs.cuentaCte = JSON.stringify(json);
			} else {
				qs = { ...qs, ...json };
			}
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

		if (operation === 'getMediosPorBanco') {
		const idBanco = (qs.IdBanco as string) || '';
		endpoint = endpoint.replace('%IDBANCO%', idBanco);
		if (qs.IdBanco) delete qs.IdBanco;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}