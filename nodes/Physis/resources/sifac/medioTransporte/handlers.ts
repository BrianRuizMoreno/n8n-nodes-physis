import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        if (['create', 'update'].includes(operation)) {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    switch (operation) {
        case 'getAll':
            endpoint = `${endpoint}/medios-transporte`;
            break;
        case 'get':
            endpoint = `${endpoint}/medios-transporte/${id}`;
            break;
        case 'create':
            endpoint = `${endpoint}/medios-transporte`;
            method = 'POST';
            break;
        case 'update':
            endpoint = `${endpoint}/medios-transporte/${id}`;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${endpoint}/medios-transporte/${id}`;
            method = 'DELETE';
            break;
        case 'getByTransportista':
            endpoint = `${endpoint}/transportistas/${id}/medios-transporte`;
            break;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data as IDataObject }];
}