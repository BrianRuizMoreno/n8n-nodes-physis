import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: any = {}; 
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    let jsonParameters: any = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    switch (operation) {
        // ------------------------------------------
        // FIRMANTES
        // ------------------------------------------
        case 'listSignatories':
            method = 'GET';
            endpoint = `${baseUrl}/firmantes-all`;
            break;

        // ------------------------------------------
        // CONTROLES DE FECHA (SUBDIARIO)
        // ------------------------------------------
        case 'checkSubjournalDate':
            method = 'GET';
            endpoint = `${baseUrl}/subdiario-controla-fechas`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdPpal: this.getNodeParameter('idPpal', index) as number,
                IdTipoComprobante: this.getNodeParameter('idTipoComprobante', index) as string,
                Fecha: this.getNodeParameter('fecha', index) as string
            };
            break;

        // ------------------------------------------
        // IVA DEVOLUCIÓN
        // ------------------------------------------
        case 'checkIvaRefundStatus':
            method = 'GET';
            endpoint = `${baseUrl}/iva-devolucion-comprobantes-registrados`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdComprobante: this.getNodeParameter('idComprobante', index) as number
            };
            break;

        // ------------------------------------------
        // COMPROBANTES DE TERCERO
        // ------------------------------------------
        case 'createThirdPartyVoucher':

        method = 'POST';
            endpoint = `${baseUrl}/comprobantedetercero`;
            
            if (Array.isArray(jsonParameters)) {
                body = jsonParameters;
            } else {
                body = [jsonParameters];
            }
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}