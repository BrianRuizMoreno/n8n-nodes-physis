import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let id = '';
    let qs: IDataObject = {};

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { qs = JSON.parse(this.getNodeParameter('jsonBody', index) as string); } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/silab/campanias';
    } 
    else if (operation === 'get') {
        endpoint = `/phy2service/api/silab/campanias/${id}`;
    }

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}