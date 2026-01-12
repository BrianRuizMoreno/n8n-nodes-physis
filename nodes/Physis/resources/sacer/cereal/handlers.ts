import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (['POST', 'PUT'].includes(method) || 
            ['createCereal', 'updateCereal', 'createCalidad', 'updateCalidad', 'getCerealesGrid', 'getCalidadesGrid'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getCereales') {
        endpoint = '/phy2service/api/sacer/cereales';
    }
    else if (operation === 'getCerealesGrid') {
        endpoint = '/phy2service/api/sacer/cereales/consultas';
        method = 'POST'; 
    }
    else if (operation === 'getCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${id}`;
    }
    else if (operation === 'createCereal') {
        endpoint = '/phy2service/api/sacer/cereales';
        method = 'POST';
    }
    else if (operation === 'updateCereal') {
        endpoint = '/phy2service/api/sacer/cereales';
        method = 'PUT';
    }
    else if (operation === 'deleteCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getVariedades') {
        endpoint = `/phy2service/api/sacer/cereales/${id}/variedades`;
    }
    else if (operation === 'getProductosCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${id}/productos`;
    }
    else if (operation === 'addProductosCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${id}/productos`;
        method = 'POST';
        qs.productosJson = JSON.stringify(body); 
        body = {}; 
    }

    else if (operation === 'getCalidades') {
        endpoint = '/phy2service/api/sacer/calidades'; 
    }
    else if (operation === 'getCalidadesGrid') {
        endpoint = '/phy2service/api/sacer/calidades/consulta';
        method = 'POST'; 
    }
    else if (operation === 'getCalidad') {
        endpoint = `/phy2service/api/sacer/calidades/${id}`;
    }
    else if (operation === 'createCalidad') {
        endpoint = '/phy2service/api/sacer/calidades';
        method = 'POST';
    }
    else if (operation === 'updateCalidad') {
        endpoint = '/phy2service/api/sacer/calidades';
        method = 'PUT';
    }
    else if (operation === 'deleteCalidad') {
        endpoint = `/phy2service/api/sacer/calidades/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getCalidadesPorCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${id}/calidades`;
    }
    else if (operation === 'getAgrupacionesPorCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${id}/calidades/agrupaciones`;
    }
    else if (operation === 'getAgrupacion') {
        endpoint = `/phy2service/api/sacer/calidades/agrupaciones/${id}`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}