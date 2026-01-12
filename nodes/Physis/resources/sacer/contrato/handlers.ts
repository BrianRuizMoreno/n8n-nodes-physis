import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/contratos';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    
    let id = ''; 
    let codCampania = '';
    let nroContrato = '';
    let idAuxi = '';
    let idCtaAuxi = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { codCampania = this.getNodeParameter('codCampania', index) as string; } catch (e) {}
    try { nroContrato = this.getNodeParameter('nroContrato', index) as string; } catch (e) {}
    try { idAuxi = this.getNodeParameter('idAuxi', index) as string; } catch (e) {}
    try { idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (['create', 'update', 'tableSearch'].includes(operation)) {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}


    if (operation === 'getAll') {

        endpoint = endpoint;
    }
    else if (operation === 'getByTercero') {
        endpoint = `/phy2service/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/contratos`;
    }
    else if (operation === 'get') {

        endpoint = `/phy2service/api/sacer/campanias/${codCampania}/contratos/${nroContrato}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'tableSearch') {
        endpoint = `${endpoint}/consultas`;
        method = 'POST';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}