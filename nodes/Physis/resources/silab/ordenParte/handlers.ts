import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let id = '';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try {
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (['upsert', 'itemsEstados'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') endpoint = '/phy2service/api/silab/ordenes-partes';
    else if (operation === 'get') endpoint = `/phy2service/api/silab/ordenes-partes/${id}`;
    else if (operation === 'upsert') { endpoint = '/phy2service/api/silab/ordenes-partes'; method = 'POST'; }
    else if (operation === 'delete') { 
        endpoint = '/phy2service/api/silab/ordenes-partes'; 
        method = 'DELETE';
        if (id && !qs.IdParteDeLabores) qs.IdParteDeLabores = id;
    }
    else if (operation === 'getPuma') endpoint = '/phy2service/api/silab/partes-puma';
    else if (operation === 'getDeleted') endpoint = '/phy2service/api/silab/partes-eliminados';
    else if (operation === 'itemsEstados') { endpoint = '/phy2service/api/silab/ordenes-partes/items/estados'; method = 'POST'; }
    else if (operation === 'getByPersonal') endpoint = `/phy2service/api/silab/personal/${id}/partes`;
    else if (operation === 'getByItems') endpoint = `/phy2service/api/silab/personal/${id}/partes/items`;

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data as IDataObject }];
}