import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/humedades';
    let method = 'GET';
    let body: IDataObject | IDataObject[] = {}; 
    let qs: IDataObject = {};
    let codCereal = '';
    let porcHumedad = '';
    let idHumedad = '';

    try { codCereal = this.getNodeParameter('codCereal', index) as string; } catch (e) {}
    try { porcHumedad = this.getNodeParameter('porcHumedad', index) as string; } catch (e) {}
    try { idHumedad = this.getNodeParameter('id', index) as string; } catch (e) {} 

    try { 
        const rawJson = JSON.parse(this.getNodeParameter('jsonBody', index) as string) as unknown;
        
        if (['create', 'update'].includes(operation)) {
            if (operation === 'create' && Array.isArray(rawJson)) {
                body = rawJson as IDataObject[];
            } else if (typeof rawJson === 'object' && rawJson !== null) {
                body = rawJson as IDataObject;
            }
        }
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = `${endpoint}/${codCereal}`;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${codCereal}/${porcHumedad}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `/phy2service/api/sacer/humedad/${idHumedad}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body as unknown as IDataObject, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}