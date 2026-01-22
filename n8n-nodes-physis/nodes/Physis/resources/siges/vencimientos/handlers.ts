import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';
import { DateTime } from 'luxon';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	const baseUrl = '/phy2service/api/siges/vencimientos-reagrupados';
	const endpoint = baseUrl;
	const method = 'GET'; 
	let qs: IDataObject = {};

	switch (operation) {
		case 'getGroupedMaturities':
			const idAuxi = this.getNodeParameter('idAuxi', index) as number;
			const idReagAuxi = this.getNodeParameter('idReagAuxi', index) as number;
			const idCtaReagAuxi = this.getNodeParameter('idCtaReagAuxi', index, '') as string;
			const fechaInput = this.getNodeParameter('fechaDesde', index) as string;

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