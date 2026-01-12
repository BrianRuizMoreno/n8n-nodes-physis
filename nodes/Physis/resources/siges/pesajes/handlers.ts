import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/pesaje';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const rawJson = JSON.parse(this.getNodeParameter('jsonBody', index) as string) as unknown;
        
        if (['openTicket', 'closeTicket', 'updateTicket'].includes(operation)) {
            if (typeof rawJson === 'object' && rawJson !== null && !Array.isArray(rawJson)) {
                body = rawJson as IDataObject;
            }
        } else {
            if (typeof rawJson === 'object' && rawJson !== null && !Array.isArray(rawJson)) {
                qs = rawJson as IDataObject;
            }
        }
    } catch (e) {}

    // --- BÁSCULAS ---
    if (operation === 'getAllBasculas') {
        endpoint = `${endpoint}/basculas`;
    }
    else if (operation === 'getBascula') {
        endpoint = `${endpoint}/basculas/${id}`;
    }
    else if (operation === 'getBasculaPeso') {
        endpoint = `${endpoint}/basculas/${id}/peso`;
    }

    // --- TICKETS ---
    else if (operation === 'getAllTickets') {
        endpoint = `${endpoint}/tickets`;
    }
    else if (operation === 'getTicket') {
        endpoint = `${endpoint}/tickets/${id}`;
    }
    else if (operation === 'openTicket') {
        endpoint = `${endpoint}/tickets/abrir`;
        method = 'POST';
    }
    else if (operation === 'updateTicket') {
        endpoint = `${endpoint}/tickets/${id}`;
        method = 'PUT';
    }
    else if (operation === 'closeTicket') {
        endpoint = `${endpoint}/tickets/${id}/cerrar`;
        method = 'POST';
    }
    else if (operation === 'voidTicket') {
        endpoint = `${endpoint}/tickets/${id}/anular`;
        method = 'PUT';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}