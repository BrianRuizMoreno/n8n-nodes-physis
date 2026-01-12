import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/cta-cte-granos';
    const method = 'GET';
    const body: IDataObject = {};
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        qs = json as IDataObject;
    } catch (e) {}


    if (operation === 'getMovimientos') {
        endpoint = endpoint;
    }
    else if (operation === 'getTotales') {
        endpoint = `${endpoint}/totales`;
    }
    else if (operation === 'getInformeTotales') {
        endpoint = `${endpoint}/informe-totales`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}