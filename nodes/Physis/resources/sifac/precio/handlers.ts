import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = ''; 

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        if (operation === 'upsertListaPrecios') {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    switch (operation) {
        case 'getListas':
            endpoint = `${endpoint}/listas-precios`;
            break;
        case 'getProductosLista':
            endpoint = `${endpoint}/listas-precios/${id}/productos`;
            break;
        case 'getPreciosProducto':
            endpoint = `${endpoint}/productos/${id}/precios`;
            break;
        case 'getPrecioProductoEnLista':
            const idLista = qs.idLista as string;
            if (!idLista) throw new Error('Se requiere idLista en JSON Body para esta operación');
            endpoint = `${endpoint}/productos/${id}/precios/${idLista}`;
            break;
        case 'getPreciosExistencia':
            endpoint = `${endpoint}/productos/precios-existencia`;
            break;
        case 'upsertListaPrecios':
            endpoint = `${endpoint}/productos/${id}/lista-precios`;
            method = 'POST';
            break;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data as IDataObject }];
}