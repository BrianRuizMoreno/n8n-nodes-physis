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

	switch (operation) {
		case 'getAll':
			const useAllEndpoint = this.getNodeParameter('useAllEndpoint', index, false) as boolean;
			
			if (useAllEndpoint) {
				endpoint = `${baseUrl}/tipos-comprobante/all`;
			} else {
				endpoint = `${baseUrl}/tipos-comprobante`;
				
				const idModelo = this.getNodeParameter('idModelo', index, 0) as number;
				const fechaVigencia = this.getNodeParameter('fechaVigencia', index, '') as string;

				if (idModelo !== 0) qs.idModelo = idModelo;
				if (fechaVigencia) qs.fechaVigencia = fechaVigencia;
			}
			break;

		case 'get':
			const id = this.getNodeParameter('idTipoComprobante', index) as string;
			endpoint = `${baseUrl}/tipos-comprobante/${id}`;
			break;
		case 'create':
			method = 'POST';
			endpoint = `${baseUrl}/tipos-comprobante`;
			break;
		case 'update':
			method = 'PUT';
			endpoint = `${baseUrl}/tipos-comprobante`;
			break;
		case 'delete':
			method = 'DELETE';
			const idDel = this.getNodeParameter('idTipoComprobante', index) as string;
			endpoint = `${baseUrl}/tipos-comprobante/${idDel}`;
			break;
		case 'getNumerators':
			const idNum = this.getNodeParameter('idTipoComprobante', index) as string;
			endpoint = `${baseUrl}/tipos-comprobante/${idNum}/numeradores`;
			break;
		case 'getByAffectation':
			endpoint = `${baseUrl}/tipos-comprobante-all-afectacion`;
			qs = {
				IdPpal: this.getNodeParameter('idPpal', index) as number,
				Afectacion: this.getNodeParameter('afectacion', index) as number,
				FechaVigencia: this.getNodeParameter('fechaVigencia', index) as string
			};
			break;
		case 'getByIVA':
			endpoint = `${baseUrl}/tipos-comprobante-all-iva`;
			qs = {
				IdPpal: this.getNodeParameter('idPpal', index) as number,
				TipoIVA: this.getNodeParameter('tipoIva', index) as string
			};
			break;
		case 'getClasses':
			endpoint = `${baseUrl}/tipos-comprobante/clases`;
			qs = {
				Origen: this.getNodeParameter('origen', index) as number,
				SubSistema: this.getNodeParameter('subSistema', index) as string
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