import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac/transportes';
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

    if (operation === 'getAll') {
        endpoint = endpoint;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getArbol') {
        endpoint = '/phy2service/api/sifac/clientes/transportes/arbol';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}