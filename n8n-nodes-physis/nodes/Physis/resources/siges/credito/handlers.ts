import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges';
	let endpoint = '';
	let method = 'GET';
	const body: IDataObject = {};
	let qs: IDataObject = {};

	const idAuxi = this.getNodeParameter('id', index, '') as string;
	const idCtaAuxi = this.getNodeParameter('idCta', index, '') as string;

	switch (operation) {
		case 'getAll':
			endpoint = `${baseUrl}/creditos`;
			break;

		case 'getTiposBienes':
			endpoint = `${baseUrl}/tipobienes`;
			break;

		case 'upsert':
			endpoint = `${baseUrl}/creditos/insertupdate`;
			method = 'POST';
			break;

		case 'delete':
			endpoint = `${baseUrl}/creditos/delete`;
			method = 'POST'; 
			break;

		case 'getDisponible':
			endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}/credito-disponible`;
			break;

		case 'getDisponibleDetalle':
			endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}/%OPCION%/credito-disponible-detalle`;
			break;

		case 'getFormasCancelacion':
			endpoint = `${baseUrl}/terceros/Creditos-Forma-Cancelacion`;
			break;

		default:
			throw new Error(`Operación ${operation} no soportada.`);
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;

			if (operation === 'upsert') {
				qs.creditoJson = JSON.stringify(json);
			} else {
				qs = { ...qs, ...json };
			}
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	if (['getAll', 'delete'].includes(operation)) {
		if (idAuxi) qs.IdAuxi = idAuxi;
		if (idCtaAuxi) qs.IdCtaAuxi = idCtaAuxi;
	}

	if (operation === 'getDisponibleDetalle') {
		const opcion = (qs.opcion as string) || '0';
		endpoint = endpoint.replace('%OPCION%', opcion);
		if (qs.opcion) delete qs.opcion;
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}