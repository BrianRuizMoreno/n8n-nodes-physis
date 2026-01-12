import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/fijaciones';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let codCampania = '';
    let nroContrato = '';
    let nroFijacion = '';
    let idFijacion = '';

    try { codCampania = this.getNodeParameter('codCampania', index) as string; } catch (e) {}
    try { nroContrato = this.getNodeParameter('nroContrato', index) as string; } catch (e) {}
    try { nroFijacion = this.getNodeParameter('nroFijacion', index) as string; } catch (e) {}
    try { idFijacion = this.getNodeParameter('idFijacion', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        if (['create', 'update'].includes(operation)) {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = endpoint;
    }
    else if (operation === 'getByContract') {
        endpoint = `/phy2service/api/sacer/campanias/${codCampania}/contratos/${nroContrato}/fijaciones`;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${nroContrato}/${codCampania}/${nroFijacion}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${idFijacion}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}