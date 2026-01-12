import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/mayor';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        qs = json;
    } catch (e) {}

    if (operation === 'getMayor') {
    }
    else if (operation === 'getReferenciados') {
        endpoint = `${endpoint}/referenciados`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}