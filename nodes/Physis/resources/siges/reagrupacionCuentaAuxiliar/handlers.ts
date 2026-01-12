import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/reagrupacioncuentasrelaciondeauxiliar';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (operation === 'create') {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getRelated') {
        endpoint = endpoint; 
    }
    else if (operation === 'getAvailable') {
        endpoint = `${endpoint}-disponible`;
    }
    else if (operation === 'getAvailableTree') {
        endpoint = `${endpoint}-disponible/arbol`;
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/siges/reagrupacioncuentasrelaciondeAuxiliar-Auxi';
        method = 'POST';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}