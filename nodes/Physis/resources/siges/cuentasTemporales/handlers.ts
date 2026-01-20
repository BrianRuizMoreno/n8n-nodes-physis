import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/cuentastemp';
	let endpoint = '';
	let method = 'GET'; 
	let qs: IDataObject = {};
    const body: IDataObject = {}; 

	const idConexion = this.getNodeParameter('idConexion', index, 0) as number;

	switch (operation) {
		case 'clean':
			endpoint = `${baseUrl}/limpia`;
			qs = { IdConexion: idConexion };
			break;

		case 'insertPrincipal':
			endpoint = `${baseUrl}/ppal`;
			qs = {
				IdConexion: idConexion,
				Cuentas: this.getNodeParameter('cuentas', index) as string
			};
			break;

		case 'insertAuxiliary':
			endpoint = `${baseUrl}/auxi`;
			qs = {
				IdConexion: idConexion,
				IdAuxi: this.getNodeParameter('idAuxi', index) as number,
				Cuentas: this.getNodeParameter('cuentas', index) as string
			};
			break;

		case 'insertAllAuxiliary':
			endpoint = `${baseUrl}/auxi-all`;
			qs = {
				IdConexion: idConexion,
				IdAuxi: this.getNodeParameter('idAuxi', index) as number
			};
			break;

		case 'insertRegroupingPrincipal':
			endpoint = `${baseUrl}/reagppal`;
			qs = {
				IdConexion: idConexion,
				IdReagPpal: this.getNodeParameter('idReagPpal', index) as number,
				Cuentas: this.getNodeParameter('cuentas', index) as string
			};
			break;

		case 'insertRegroupingAuxiliary':
			endpoint = `${baseUrl}/reagauxi`;
			qs = {
				IdConexion: idConexion,
				IdAuxi: this.getNodeParameter('idAuxi', index) as number,
				IdReagAuxi: this.getNodeParameter('idReagAuxi', index) as number,
				Cuentas: this.getNodeParameter('cuentas', index) as string
			};
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

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}