import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/proveedores/compradores';
    let method = 'GET';
    let body: IDataObject | IDataObject[] = {}; 
    let qs: IDataObject = {};
    
    let idComprador = '';
    let idAutorizante = '';

    try { idComprador = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idAutorizante = this.getNodeParameter('idAutorizante', index) as string; } catch (e) {}

    try { 
        const rawJson = JSON.parse(this.getNodeParameter('jsonBody', index) as string) as unknown;

        if (['saveSettings', 'addAutorizante', 'addAutorizanteList', 'updateAutorizante'].includes(operation)) {
            if (Array.isArray(rawJson)) {
                body = rawJson as IDataObject[];
            } else if (typeof rawJson === 'object' && rawJson !== null) {
                body = rawJson as IDataObject;
            }
        } else {
            if (typeof rawJson === 'object' && rawJson !== null && !Array.isArray(rawJson)) {
                qs = rawJson as IDataObject;
            }
        }
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = endpoint;
    }
    else if (operation === 'getSettings') {
        endpoint = `${endpoint}/settings`;
    }
    else if (operation === 'saveSettings') {
        endpoint = `${endpoint}/settings`;
        method = 'POST';
    }
    
    else if (operation === 'getAllAutorizantes') {
        endpoint = '/phy2service/api/siges/proveedores/autorizantes';
    }
    else if (operation === 'getAutorizantes') {
        endpoint = `${endpoint}/${idComprador}/autorizantes`;
    }
    else if (operation === 'addAutorizante') {
        endpoint = `${endpoint}/${idComprador}/autorizantes`;
        method = 'POST';
    }
    else if (operation === 'addAutorizanteList') {
        endpoint = `${endpoint}/${idComprador}/autorizantes-list`;
        method = 'POST';
    }
    else if (operation === 'updateAutorizante') {
        endpoint = `${endpoint}/${idComprador}/autorizantes/${idAutorizante}`;
        method = 'PATCH';
    }
    else if (operation === 'deleteAutorizante') {
        endpoint = `${endpoint}/${idComprador}/autorizantes/${idAutorizante}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body as unknown as IDataObject, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}