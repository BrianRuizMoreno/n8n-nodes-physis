import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrlPpal = '/phy2service/api/siges/cuentas-ppal';
	const baseUrlPrincipales = '/phy2service/api/siges/cuentas-principales';
	
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {

        case 'getAll':
			endpoint = baseUrlPpal;
			break;
		case 'get':
			endpoint = `${baseUrlPpal}/${id}`;
			break;
		case 'create':
			endpoint = baseUrlPrincipales;
			method = 'POST';
			break;
		case 'update':
			endpoint = baseUrlPrincipales;
			method = 'PUT';
			break;
		case 'delete':
			endpoint = baseUrlPrincipales;
			method = 'DELETE';
			break;

		// --- ARBOL Y LISTAS ---
		case 'getArbol':
			endpoint = `${baseUrlPrincipales}/arbol`;
			break;
		case 'getTreeList':
			endpoint = `${baseUrlPrincipales}/treelist`;
			break;
		case 'getDepositos':
			endpoint = `${baseUrlPpal}-depositos`; 
			break;

		// --- CONSULTAS ESPECÍFICAS ---
		case 'getAuxiliares':
			endpoint = `${baseUrlPrincipales}/cuentas-auxiliares`;
			break;
		case 'getByAuxi':
			endpoint = `${baseUrlPrincipales}/de-auxi/${id}`;
			break;
		case 'getReagrupacion':
			endpoint = `${baseUrlPrincipales}/cuentas-Reag/${id}`;
			break;
		case 'getNext':
			endpoint = `/phy2service/api/siges/cuentas-principales-siguiente/${id}`;
			break;

		// --- BÚSQUEDAS (POST) ---
		case 'search':
			endpoint = `${baseUrlPpal}-buscar`;
			method = 'POST';
			break;
		case 'searchOPRC':
			endpoint = `${baseUrlPpal}-buscar-oprc`;
			method = 'POST';
			break;
		case 'searchValores':
			endpoint = `${baseUrlPpal}-buscar-valores`;
			method = 'POST';
			break;
		case 'searchRetenciones':
			endpoint = `${baseUrlPpal}-buscar-retenciones`;
			method = 'POST';
			break;

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