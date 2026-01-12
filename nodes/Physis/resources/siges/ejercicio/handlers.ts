import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/ejercicios';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'update', 'delete'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
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
        method = 'DELETE'; 
    }
        else if (operation === 'getActual') {
        endpoint = `${endpoint}/actual`;
    }
    else if (operation === 'setActual') {
        endpoint = `${endpoint}/actual/${id}`;
        method = 'PUT';
    }
    else if (operation === 'getDiariosParametros') {
        endpoint = '/phy2service/api/siges/ejercicios-diarios-parametros';
    }
    else if (operation === 'getDiariosComprobantes') {
        endpoint = '/phy2service/api/siges/ejercicios-diarios-comprobantes';
    }
    else if (operation === 'getDiarioPrimero') {
        endpoint = '/phy2service/api/siges/ejercicios-diarios-comprobante-primero';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}