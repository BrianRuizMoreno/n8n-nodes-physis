import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let qs: IDataObject = {};

    try { qs = JSON.parse(this.getNodeParameter('jsonBody', index) as string); } catch (e) {}

    if (operation === 'getSaldo') endpoint = '/phy2service/api/siges/Saldos';
    else if (operation === 'getSaldoMM') endpoint = '/phy2service/api/siges/SaldosMM';

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data }];
}