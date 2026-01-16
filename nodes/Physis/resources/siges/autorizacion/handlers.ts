import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (['updatePase', 'getAfectaciones'].includes(operation)) body = json;
        else qs = json;
    } catch (e) {}

    if (operation === 'getAll') endpoint = '/phy2service/api/siges/autorizantes';
    else if (operation === 'getPasesPendientes') endpoint = '/phy2service/api/siges/pases/pendientes';
    else if (operation === 'updatePase') {
        endpoint = '/phy2service/api/siges/pases';
        method = 'PATCH';
    }
    else if (operation === 'updatePasePut') {
        endpoint = '/phy2service/api/siges/pases';
        method = 'PUT';
    }
    else if (operation === 'getAfectaciones') {
        endpoint = '/phy2service/api/siges/pases-cab-afectaciones';
        method = 'POST'; 
    }
    else if (operation === 'getSinAfectar') {
        endpoint = '/phy2service/api/siges/pases-ref-sin-afectaciones';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data }];
}