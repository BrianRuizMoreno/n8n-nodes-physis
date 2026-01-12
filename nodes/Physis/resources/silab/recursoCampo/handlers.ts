import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let param = '';

    try { param = this.getNodeParameter('id', index) as string; } catch (e) {}

    if (operation === 'getAllMaquinarias') endpoint = '/phy2service/api/silab/maquinarias';
    else if (operation === 'getMaquinariaByName') endpoint = `/phy2service/api/silab/maquinarias/${param}`;

    const response = await transport.request('GET', endpoint) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data as IDataObject }];
}