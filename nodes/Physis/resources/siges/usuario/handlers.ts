import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/usuarios';
    let method = 'GET';
    let body: IDataObject | string[] = {}; 
    let qs: IDataObject = {};
    let idUsuario = ''; 
    let idAuxi = '';

    try { idUsuario = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idAuxi = this.getNodeParameter('idAuxi', index) as string; } catch (e) {}

    try { 
        const rawJson = JSON.parse(this.getNodeParameter('jsonBody', index) as string) as unknown;
        
        if (operation === 'linkTercero') {
            if (Array.isArray(rawJson)) {
                body = rawJson.map(String);
            }
        } else {
            if (typeof rawJson === 'object' && rawJson !== null && !Array.isArray(rawJson)) {
                qs = rawJson as IDataObject;
            }
        }
    } catch (e) {}


    if (operation === 'getAll') {
        endpoint = endpoint;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${idUsuario}`;
    }
    else if (operation === 'getTerceros') {
        endpoint = `${endpoint}/${idUsuario}/terceros/${idAuxi}`;
    }
    else if (operation === 'linkTercero') {
        endpoint = `${endpoint}/${idUsuario}/terceros/${idAuxi}`;
        method = 'POST';
    }

    const response = await transport.request(
        method, 
        endpoint, 
        body as unknown as IDataObject, 
        qs
    ) as IDataObject;

    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}