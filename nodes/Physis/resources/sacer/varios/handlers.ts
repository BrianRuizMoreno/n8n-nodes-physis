import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const resource = this.getNodeParameter('resource', index) as string;
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '';
	const method = 'GET';
	let qs: IDataObject = {};
	const body: IDataObject = {};

	switch (resource) {
		case 'liquidacion':
			if (operation === 'getPdf') {
				const idEjercicio = this.getNodeParameter('idEjercicio', index, '') as string;
				const idComprobante = this.getNodeParameter('idComprobante', index, '') as string;
				endpoint = `/phy2service/api/sacer/ejercicios/${idEjercicio}/liquidaciones/${idComprobante}/pdf`;
			}
			break;

		case 'localidad':
			if (operation === 'getAll') {
				endpoint = '/phy2service/api/sacer/localidades';
			}
			break;

		case 'lote': {
			if (operation === 'get') {
				const codLote = this.getNodeParameter('id', index, '') as string;
				endpoint = `/phy2service/api/sacer/lotes/${codLote}`;
			}
			else if (operation === 'getByTercero') {
				const idAuxi = this.getNodeParameter('idAuxi', index, '') as string;
				const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '') as string;
				endpoint = `/phy2service/api/sacer/lotes/${idAuxi}/${idCtaAuxi}`;
			}
			break;
		}

		case 'muestra': {
			if (operation === 'get') {
				const idCartaPorte = this.getNodeParameter('idCartaPorte', index, '') as string;
				const nroMuestra = this.getNodeParameter('nroMuestra', index, '') as string;
				endpoint = `/phy2service/api/sacer/muestras/${idCartaPorte}/${nroMuestra}`;
			}
			else if (operation === 'getAll') {
				endpoint = '/phy2service/api/sacer/muestras';
			}
			break;
		}

		case 'sucursal':
			if (operation === 'getAll') {
				endpoint = '/phy2service/api/sacer/sucursales';
			}
			break;

		case 'tipoTercero':
			if (operation === 'getTercero') {
				endpoint = '/phy2service/api/sacer/tipos-tercero';
			}
			break;

		default:
			throw new Error(`El recurso SACER "${resource}" no está manejado en varios/handlers.ts`);
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