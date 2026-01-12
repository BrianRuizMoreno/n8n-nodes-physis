import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    if (operation === 'getAll') endpoint = '/phy2service/api/silab/personal';
    else if (operation === 'get') endpoint = `/phy2service/api/silab/personal/${id}`;
    else if (operation === 'getByLabor') endpoint = `/phy2service/api/silab/labores/${id}/personal`;

    const response = await transport.request('GET', endpoint) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data as IDataObject }];
}