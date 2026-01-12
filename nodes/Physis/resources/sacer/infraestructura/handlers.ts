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
            ['createPlanta', 'updatePlanta', 'createSilo', 'updateSilo'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getPlantas') {
        endpoint = '/phy2service/api/sacer/plantas'; 
    }
    else if (operation === 'getPlanta') {
        endpoint = `/phy2service/api/sacer/plantas/${id}`; 
	}
    else if (operation === 'getNumeradoresPlanta') {
        endpoint = `/phy2service/api/sacer/plantas/${id}/numeradores`; 
    }
    else if (operation === 'createPlanta') {
        endpoint = '/phy2service/api/sacer/plantas';
        method = 'POST';
    }
    else if (operation === 'updatePlanta') {
        endpoint = '/phy2service/api/sacer/plantas';
        method = 'PUT';
    }
    else if (operation === 'deletePlanta') {
        endpoint = `/phy2service/api/sacer/plantas/${id}`;
        method = 'DELETE';
    }

    else if (operation === 'getSilos') {
        endpoint = '/phy2service/api/sacer/Silos';
    }
    else if (operation === 'getSilo') {
        endpoint = `/phy2service/api/sacer/Silos/${id}`;
    }
    else if (operation === 'createSilo') {
        endpoint = '/phy2service/api/sacer/Silos';
        method = 'POST';
    }
    else if (operation === 'updateSilo') {
        endpoint = '/phy2service/api/sacer/Silos';
        method = 'PUT';
    }
    else if (operation === 'deleteSilo') {
        endpoint = `/phy2service/api/sacer/Silos/${id}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}