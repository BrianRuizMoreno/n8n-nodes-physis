import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/comprobantes';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = ''; let idEj = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idEj = this.getNodeParameter('idEjercicio', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['insert', 'update', 'calcRetenciones'].includes(operation)) {
             qs.comprobante = JSON.stringify(json);
        }
        else if (operation === 'createOPMasivo') {
            body = json; 
        }
        else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
    }
    else if (operation === 'getAllPaginado') {
        endpoint = '/phy2service/api/siges/comprobantes-all-paginados';
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`; 
        if (idEj) qs.idEjercicio = idEj;
    }
    else if (operation === 'insert') {
        endpoint = '/phy2service/api/siges/comprobantes/insert';
        endpoint = `${endpoint}/insert`; 
    } 
    else if (operation === 'update') {
        endpoint = `${endpoint}/update`;
    }
    else if (operation === 'delete') {
        method = 'DELETE';
    }
    else if (operation === 'anular') {
        endpoint = `${endpoint}/anular`;
    }
    else if (operation === 'getCantidades') {
        endpoint = `${endpoint}/cantidades`;
    }
    else if (operation === 'getPendientesPago') {
        endpoint = `${endpoint}/pendientes_a_pagar`;
    }
    else if (operation === 'calcRetenciones') {
        endpoint = `${endpoint}/RetencionesAutomaticas`;
    }
    else if (operation === 'getParametros') {
        endpoint = `${endpoint}/${idEj}/${id}/parametros`;
    }
    else if (operation === 'getCertificados') {
        endpoint = `${endpoint}/${idEj}/${id}/certificados`;
    }
    else if (operation === 'createOPMasivo') {
        endpoint = `${endpoint}/OPMasivos`;
        method = 'POST'; 
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}