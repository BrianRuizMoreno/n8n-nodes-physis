import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/reagrupacioncuentasrelaciondePrincipal'; // Base común
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'createDirect'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getDetail') {
        endpoint = endpoint;
    }
    else if (operation === 'getSelected') {
        endpoint = `${endpoint}-selec`;
    }
    else if (operation === 'getAvailable') {
        endpoint = `${endpoint}-disponible`;
    }
    else if (operation === 'getAvailableTree') {
        endpoint = `${endpoint}-disponible/arbol`;
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/siges/reagrupacioncuentasrelaciondePpal-ppales';
        method = 'POST';
    }
    else if (operation === 'createDirect') {
        endpoint = '/phy2service/api/siges/reagrupaciones-ppales';
        method = 'POST';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}