import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/numeradores';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    
    let id = '';
    let idEjercicio = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idEjercicio = this.getNodeParameter('idEjercicio', index) as string; } catch (e) {}

    try { 
        const rawJson = JSON.parse(this.getNodeParameter('jsonBody', index) as string) as unknown;
        if (typeof rawJson === 'object' && rawJson !== null && !Array.isArray(rawJson)) {
            if (['create', 'update'].includes(operation)) {
                body = rawJson as IDataObject;
            } else {
                qs = rawJson as IDataObject;
            }
        }
    } catch (e) {}


    if (operation === 'getAll') {
        if (idEjercicio) {
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/numeradores`;
        } else {
            endpoint = '/phy2service/api/siges/numeradores';
        }
    }
    else if (operation === 'get') {
        if (idEjercicio) {
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/numeradores/${id}`;
        } else {
            endpoint = `/phy2service/api/siges/numeradores/${id}`;
        }
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/siges/numeradores';
        method = 'POST';
    }
    else if (operation === 'update') {
        endpoint = '/phy2service/api/siges/numeradores';
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = '/phy2service/api/siges/numeradores';
        method = 'DELETE';
        qs.idNumerador = id; 
    }
    else if (operation === 'getByPrefixType') {
        endpoint = '/phy2service/api/siges/numeradores-prefijos';
    }
    else if (operation === 'getOrigin') {
        endpoint = '/phy2service/api/siges/numeradores-origen';
        qs.idNumerador = id;
    }
    else if (operation === 'getLastNumberNoPrefix') {
        endpoint = `/phy2service/api/siges/numeradores-sin-prefijo/${id}`;
        if (idEjercicio) qs.IdEjercicio = idEjercicio;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}