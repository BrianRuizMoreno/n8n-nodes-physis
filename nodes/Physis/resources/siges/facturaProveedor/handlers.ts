import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'POST';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (operation === 'checkExiste') qs = json;
        else if (operation === 'uploadAuthorized') body = json;
        else qs = json;
    } catch (e) {}

    if (operation === 'uploadPdf') {
        endpoint = '/phy2service/api/siges/facturas/pdf'; 
    } else if (operation === 'uploadPdfHash') {
        endpoint = '/phy2service/api/siges/facturas-pdf'; 
    } else if (operation === 'uploadAuthorized') {
        endpoint = '/phy2service/api/siges/facturas/pdf/autoriza'; 
    } else if (operation === 'checkExiste') {
        endpoint = '/phy2service/api/siges/factura/pdf/existe';
        method = 'GET';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data }];
}