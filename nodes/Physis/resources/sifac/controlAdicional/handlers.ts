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
        if (operation.startsWith('create') || operation.startsWith('update')) {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    switch (operation) {

        case 'getAll': endpoint += '/controles-adicionales'; break;
        case 'get': endpoint += `/controles-adicionales/${id}`; break;
        case 'create': endpoint += '/controles-adicionales'; method = 'POST'; break;
        case 'update': endpoint += `/controles-adicionales/${id}`; method = 'PUT'; break;
        case 'delete': endpoint += `/controles-adicionales/${id}`; method = 'DELETE'; break;
        case 'getConductorAll': endpoint += '/conductores/controles-adicionales'; break;
        case 'getConductor': endpoint += `/conductores/${id}/controles-adicionales`; break;
        case 'assignConductor': endpoint += `/conductores/${id}/controles-adicionales`; method = 'POST'; break;
        case 'updateConductor': endpoint += `/conductores/${id}/controles-adicionales`; method = 'PUT'; break;
        case 'clearConductor': endpoint += `/conductores/${id}/controles-adicionales`; method = 'DELETE'; break;
        case 'removeConductorControl': 
            const idCtrlC = qs.idControlAdicional as string;
            endpoint += `/conductores/${id}/controles-adicionales/${idCtrlC}`; method = 'DELETE'; 
            break;
        case 'getMedioAll': endpoint += '/medios-transporte/controles-adicionales'; break;
        case 'getMedio': endpoint += `/medios-transporte/${id}/controles-adicionales`; break;
        case 'assignMedio': endpoint += `/medios-transporte/${id}/controles-adicionales`; method = 'POST'; break;
        case 'updateMedio': endpoint += `/medios-transporte/${id}/controles-adicionales`; method = 'PUT'; break;
        case 'clearMedio': endpoint += `/medios-transporte/${id}/controles-adicionales`; method = 'DELETE'; break;
        case 'removeMedioControl':
            const idCtrlM = qs.idControlAdicional as string;
            endpoint += `/medios-transporte/${id}/controles-adicionales/${idCtrlM}`; method = 'DELETE';
            break;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data as IDataObject }];
}