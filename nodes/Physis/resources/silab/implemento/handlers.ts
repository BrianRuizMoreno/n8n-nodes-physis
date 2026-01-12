import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let id = '';
    let qs: IDataObject = {};

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { qs = JSON.parse(this.getNodeParameter('jsonBody', index) as string); } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/silab/implementos';
    } 
    else if (operation === 'getAllMaq') {
        endpoint = '/phy2service/api/silab/maquinarias';
    } 
    else if (operation === 'get') {
        endpoint = `/phy2service/api/silab/implementos/${id}`;
    } 
    else if (operation === 'getByName') {
        endpoint = `/phy2service/api/silab/implementos/${id}`;
    } 
    else if (operation === 'getMaqByName') {
        endpoint = `/phy2service/api/silab/maquinarias/${id}`;
    } 
    else if (operation === 'getByLabor') {
        endpoint = `/phy2service/api/silab/labores/${id}/implementos`;
    } 
    else if (operation === 'getMaqByLabor') {
        endpoint = `/phy2service/api/silab/labores/${id}/maquinarias`;
    }

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}