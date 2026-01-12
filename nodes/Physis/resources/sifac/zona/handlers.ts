import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['POST', 'PUT'].includes(method) || 
            ['create', 'update'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getArbol') {
        endpoint = '/phy2service/api/sifac/zonas/arbol';
    }
    else if (operation === 'get') {
        endpoint = `/phy2service/api/sifac/zonas/${id}`;
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/sifac/zonas';
        method = 'POST';
    }
    else if (operation === 'update') {
        endpoint = '/phy2service/api/sifac/zonas';
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `/phy2service/api/sifac/zonas/${id}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}