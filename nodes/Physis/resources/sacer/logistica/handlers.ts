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
            ['createConductor', 'updateConductor', 'createTarifa', 'updateTarifa'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getConductores') {
        endpoint = '/phy2service/api/sacer/conductores'; 
    }
    else if (operation === 'getConductoresGrid') {
        endpoint = '/phy2service/api/sacer/v2/conductores'; 
    }
    else if (operation === 'getConductor') {
        endpoint = `/phy2service/api/sacer/conductores/${id}`;
    }
    else if (operation === 'getConductoresTransportista') {
        endpoint = `/phy2service/api/sacer/transportistas/${id}/${idCtaAuxi}/conductores`;
    }
    else if (operation === 'createConductor') {
        endpoint = '/phy2service/api/sacer/Conductores';
        method = 'POST';
    }
    else if (operation === 'updateConductor') {
        endpoint = '/phy2service/api/sacer/Conductores';
        method = 'PUT';
    }
    else if (operation === 'deleteConductor') {
        endpoint = `/phy2service/api/sacer/Conductores/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getTarifas') {
        endpoint = '/phy2service/api/sacer/tarifas'; 
    }
    else if (operation === 'getTarifasGrid') {
        endpoint = '/phy2service/api/sacer/v2/tarifas'; 
    }
    else if (operation === 'getTarifa') {
        endpoint = `/phy2service/api/sacer/tarifas/${id}`; 
    }
    else if (operation === 'createTarifa') {
        endpoint = '/phy2service/api/sacer/tarifas';
        method = 'POST';
    }
    else if (operation === 'updateTarifa') {
        endpoint = '/phy2service/api/sacer/tarifas';
        method = 'PUT';
    }
    else if (operation === 'deleteTarifa') {
        endpoint = `/phy2service/api/sacer/tarifas/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getImputacionesTarifa') {
        endpoint = `/phy2service/api/sacer/tarifas/${id}/imputaciones`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}