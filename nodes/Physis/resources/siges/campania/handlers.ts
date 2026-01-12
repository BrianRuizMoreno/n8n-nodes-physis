import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    if (operation === 'getAll') endpoint = '/phy2service/api/siges/campanias';
    else if (operation === 'get') endpoint = `/phy2service/api/siges/campanias/${id}`;
    else if (operation === 'getActive') endpoint = '/phy2service/api/siges/campanias/activa';

    const response = await transport.request('GET', endpoint) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data }];
}