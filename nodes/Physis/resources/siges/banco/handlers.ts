import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/bancos';
	let endpoint = baseUrl; 
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const id = this.getNodeParameter('id', index, '') as string;

	switch (operation) {
		// --- BANCOS CRUD ---
		case 'getAll':
			break;
		case 'get':
			endpoint = `${baseUrl}/${id}`;
			break;
		case 'create':
			method = 'POST';
			break;
		case 'update':
			method = 'PUT';
			break;
		case 'delete':
			method = 'DELETE';
			break;

		// --- CONSULTAS ESPECÍFICAS ---
		case 'getArbol':
			endpoint = `${baseUrl}/arbol`;
			break;
		case 'getCCMedios':
			endpoint = `${baseUrl}/cuentas-corrientes-medios`;
			break;
		case 'getCCElectronicos':
			endpoint = `${baseUrl}/cuentas-corrientes-electronicos`;
			break;
		case 'getCaucion':
			endpoint = `${baseUrl}/cuentas-caucion`;
			break;
		case 'getConMedios':
			endpoint = `${baseUrl}/con-medios-o-electronicos`;
			break;
		case 'getExportaOP':
			endpoint = `${baseUrl}/cuentas-corrientes-exportaOP`;
			break;
		case 'getFormatos':
			endpoint = `${baseUrl}/valores-electronicos-formatos`;
			break;
		case 'getCodigosOperacion':
			endpoint = `${baseUrl}/codigos-operacion`;
			break;
		case 'getConFormatos':
			endpoint = `${baseUrl}/con-formatos-valores-electronicos`;
			break;

		// --- CUENTAS BANCARIAS TERCEROS ---
		case 'getCuentaTercero':
			endpoint = `${baseUrl}/CuentaBancariaTercero`;
			break;
		case 'createCuentaTercero':
			endpoint = `${baseUrl}/CuentaBancariaTercero`;
			method = 'POST';
			break;
		case 'updateCuentaTercero':
			endpoint = `${baseUrl}/CuentaBancariaTercero`;
			method = 'PUT';
			break;
		case 'deleteCuentaTercero':
			endpoint = `${baseUrl}/CuentaBancariaTercero`;
			method = 'DELETE';
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

	if (operation === 'delete' && id) {
		qs.idBanco = id;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}