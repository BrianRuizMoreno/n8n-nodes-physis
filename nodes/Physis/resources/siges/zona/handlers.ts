import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        qs = json;
    } catch (e) {}

    if (operation === 'getPaises') {
        endpoint = '/phy2service/api/siges/paises';
    }
    else if (operation === 'getPais') {
        endpoint = `/phy2service/api/siges/paises/${id}`;
    }
    else if (operation === 'getProvincias') {
        endpoint = '/phy2service/api/siges/provincias';
    }
    else if (operation === 'getProvincia') {
        endpoint = `/phy2service/api/siges/provincias/${id}`;
    }
    
    else if (operation === 'getZonas') {
        endpoint = '/phy2service/api/siges/zonas';
    }
    else if (operation === 'getLugares') {
        endpoint = '/phy2service/api/siges/lugares';
    }

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}