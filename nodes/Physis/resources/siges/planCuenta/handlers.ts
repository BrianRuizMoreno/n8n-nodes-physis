import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/planes-cuentas-ppal';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'update'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    
    else if (operation === 'getCombo') {
        endpoint = '/phy2service/api/siges/planes-cuentas/combo';
    }
    else if (operation === 'getFechas') {
        endpoint = `${endpoint}-fechas`;
        if (id) qs.idPpal = id;
    }
    else if (operation === 'getTamano') {
        endpoint = `${endpoint}/tamaniototal`;
    }
    else if (operation === 'getEstructura') {
        endpoint = `${endpoint}/cuentasestructura`;
        if (id) qs.idPpal = id;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}