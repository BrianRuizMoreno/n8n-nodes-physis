import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';
import { DateTime } from 'luxon';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/vencimientos-reagrupados';
	let endpoint = baseUrl;
	let method = 'GET'; 
	let qs: IDataObject = {};

	switch (operation) {
		case 'getGroupedMaturities':
			let idAuxi = this.getNodeParameter('idAuxi', index) as number;
			let idReagAuxi = this.getNodeParameter('idReagAuxi', index) as number;
			let idCtaReagAuxi = this.getNodeParameter('idCtaReagAuxi', index, '') as string;
			let fechaInput = this.getNodeParameter('fechaDesde', index) as string;

			let fechaFormatted = fechaInput;
			if (fechaInput && fechaInput.includes('-')) {
				const dt = DateTime.fromISO(fechaInput);
				if (dt.isValid) {
					fechaFormatted = dt.toFormat('yyyyMMdd');
				}
			}
			qs = {
				idAuxi,
				idReagAuxi,
				fechaDesde: fechaFormatted
			};
			if (idCtaReagAuxi) {
				qs.idCtaReagAuxi = idCtaReagAuxi;
			}
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