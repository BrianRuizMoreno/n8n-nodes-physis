import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';
import { DateTime } from 'luxon';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {
        case 'getGroupedMaturities':
            method = 'GET';
            endpoint = `${baseUrl}/vencimientos-reagrupados`;
            
            const fechaInput = this.getNodeParameter('fechaDesde', index) as string;
            let fechaFormatted = fechaInput;
            
            if (fechaInput.includes('-')) {
                const dt = DateTime.fromISO(fechaInput);
                if (dt.isValid) {
                    fechaFormatted = dt.toFormat('yyyyMMdd');
                }
            }

            qs = {
                idAuxi: this.getNodeParameter('idAuxi', index) as number,
                idReagAuxi: this.getNodeParameter('idReagAuxi', index) as number,
                idCtaReagAuxi: this.getNodeParameter('idCtaReagAuxi', index, '') as string,
                fechaDesde: fechaFormatted
            };
            
            if (!qs.idCtaReagAuxi) delete qs.idCtaReagAuxi;
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}