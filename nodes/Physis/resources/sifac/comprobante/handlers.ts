import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let idCabecera = '';
    let idMovimiento = '';

    try { idCabecera = this.getNodeParameter('idCabecera', index) as string; } catch (e) {}
    try { idMovimiento = this.getNodeParameter('idMovimiento', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'getConsultaGrid', 'getAutorizacionGrid', 'authorizeItem'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    // --- COMPROBANTES ---
    if (operation === 'getCabeceras') {
        endpoint = '/phy2service/api/sifac/comprobantes/cabeceras'; 
    }
    else if (operation === 'getConsultaGrid') {
        endpoint = '/phy2service/api/sifac/comprobantes/consulta';
        method = 'POST'; 
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/sifac/comprobantes';
        method = 'POST';
    }

    // --- AUTORIZACIONES ---
    else if (operation === 'getAutorizacionGrid') {
        endpoint = '/phy2service/api/sifac/comprobantes/items/autorizacion/consultas';
        method = 'POST'; 
    }
    else if (operation === 'authorizeItem') {
        endpoint = `/phy2service/api/sifac/comprobantes/${idCabecera}/items/${idMovimiento}/autorizacion`;
        method = 'PATCH';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}