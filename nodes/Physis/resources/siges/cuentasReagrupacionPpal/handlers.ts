import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/cuentas-reagrupacion-ppal'; 
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const rawJson = JSON.parse(this.getNodeParameter('jsonBody', index) as string) as unknown;
        if (['create', 'update', 'delete'].includes(operation)) {
            if (typeof rawJson === 'object' && rawJson !== null && !Array.isArray(rawJson)) {
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
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'getArbol') {
        endpoint = `${endpoint}/arbol`;
    }
    else if (operation === 'getTreeList') {
        endpoint = `${endpoint}/treelist`;
    }
    else if (operation === 'getNext') {
        endpoint = '/phy2service/api/siges/cuentas-reagrupacion-Ppal/Next';
        if (id) qs.sCuenta = id;
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/siges/cuentas-reagrupaciones-ppales';
        method = 'POST';
    }
    else if (operation === 'update') {
        endpoint = '/phy2service/api/siges/cuentas-reagrupaciones-ppales';
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = '/phy2service/api/siges/cuentas-reagrupaciones-ppales';
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}