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
    let idCtaAuxi = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string; } catch (e) {}
    
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (['POST', 'PUT'].includes(method) || 
            ['createCampo', 'updateCampo', 'createEstablecimiento', 'updateEstablecimiento'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getArbol') {
        endpoint = '/phy2service/api/sacer/zonas-establecimientos-campos-lotes/arbol';
        if (id) qs.IdAuxi = id; 
        if (idCtaAuxi) qs.IdCtaAuxi = idCtaAuxi;
    }

    else if (operation === 'getCampos') {
        endpoint = '/phy2service/api/sacer/campos'; 
    }
    else if (operation === 'getCampo') {
        endpoint = `/phy2service/api/sacer/campos/${id}`;
    }
    else if (operation === 'createCampo') {
        endpoint = '/phy2service/api/sacer/campos';
        method = 'POST';
    }
    else if (operation === 'updateCampo') {
        endpoint = '/phy2service/api/sacer/campos';
        method = 'PUT';
    }
    else if (operation === 'deleteCampo') {
        endpoint = `/phy2service/api/sacer/campos/${id}`;
        method = 'DELETE';
    }

    else if (operation === 'getEstablecimientos') {
        endpoint = '/phy2service/api/sacer/establecimientos';
    }
    else if (operation === 'getEstablecimiento') {
        endpoint = `/phy2service/api/sacer/terceros/establecimientos/${id}`;
    }
    else if (operation === 'getEstablecimientosTercero') {
        endpoint = `/phy2service/api/sacer/terceros/${id}/${idCtaAuxi}/establecimientos`;
    }
    else if (operation === 'createEstablecimiento') {
        endpoint = '/phy2service/api/sacer/establecimientos';
        method = 'POST';
    }
    else if (operation === 'updateEstablecimiento') {
        endpoint = '/phy2service/api/sacer/establecimientos';
        method = 'PUT';
    }
    else if (operation === 'deleteEstablecimiento') {
        endpoint = `/phy2service/api/sacer/Establecimientos/${id}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}