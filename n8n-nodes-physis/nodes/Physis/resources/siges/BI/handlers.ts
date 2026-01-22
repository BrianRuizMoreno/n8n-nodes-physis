import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	const origen = this.getNodeParameter('origen', index, 0) as number;

	switch (operation) {
		case 'listDashboards':
			endpoint = `${baseUrl}/tableros`;
			qs = { Origen: origen };
			break;

		case 'getDashboardData':
			endpoint = `${baseUrl}/tablero`;
			const fechaDesde = this.getNodeParameter('fechaDesde', index, '') as string;
			const fechaHasta = this.getNodeParameter('fechaHasta', index, '') as string;

			qs = {
				Origen: origen,
				IdGrupo: this.getNodeParameter('idGrupo', index) as number,
				IdTablero: this.getNodeParameter('idTablero', index) as number,
			};

			if (fechaDesde) qs.FechaDesde = fechaDesde;
			if (fechaHasta) qs.FechaHasta = fechaHasta;
			break;

		case 'createDashboard':
			endpoint = `${baseUrl}/tablero`;
			method = 'POST';
			body = { origen };
			break;

		case 'updateDashboard':
			endpoint = `${baseUrl}/tablero`;
			method = 'PUT';
			body = { origen };
			break;

		case 'getGridConfig':
			endpoint = `${baseUrl}/aggrid`;
			qs = {
				Origen: origen,
				Grilla: this.getNodeParameter('grillaName', index) as string,
				IdUsuario: this.getNodeParameter('idUsuario', index, 0) as number
			};
			break;

		case 'updateGridConfig':
			endpoint = `${baseUrl}/aggrid`;
			method = 'PUT';
			body = {
				origen,
				grilla: this.getNodeParameter('grillaName', index) as string
			};
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (method === 'POST' || method === 'PUT') {
				body = { ...body, ...json };
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