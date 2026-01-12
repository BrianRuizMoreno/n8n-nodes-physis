import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let idNegocio = ''; 
    let idActividad = ''; 
    let idDocumento = '';
    let idAuxi = '';
    let idCtaAuxi = '';
    let nombreArchivo = '';

    try { idNegocio = this.getNodeParameter('idNegocio', index) as string; } catch (e) {}
    try { idActividad = this.getNodeParameter('idActividad', index) as string; } catch (e) {}
    try { idDocumento = this.getNodeParameter('idDocumento', index) as string; } catch (e) {}
    try { idAuxi = this.getNodeParameter('idAuxi', index) as string; } catch (e) {}
    try { idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string; } catch (e) {}
    try { nombreArchivo = this.getNodeParameter('nombreArchivo', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        if (['createActivity', 'updateActivity', 'upsertContact', 'updateDeal', 'createDeal', 'uploadDocuments'].includes(operation)) {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    switch (operation) {

        case 'getActivities':
            endpoint = `${endpoint}/actividades`;
            break;
        case 'createActivity':
            endpoint = `${endpoint}/actividades`;
            method = 'POST';
            break;
        case 'updateActivity':
            endpoint = `${endpoint}/actividades`;
            method = 'PUT';
            break;
        case 'deleteActivity':
            endpoint = `${endpoint}/actividades`;
            method = 'DELETE';
            if (idNegocio) qs.idNegocio = idNegocio;
            if (idActividad) qs.idActividad = idActividad;
            break;
        case 'getContacts':
            endpoint = `${endpoint}/contactos`;
            break;
        case 'upsertContact':
            endpoint = `${endpoint}/contactos`;
            method = 'POST';
            break;
        case 'getClients':
            endpoint = `${endpoint}/clientes`;
            break;
        case 'getDeals':
            endpoint = `${endpoint}/negocios`;
            break;
        case 'updateDeal':
            endpoint = `${endpoint}/negocios`;
            method = 'PUT';
            break;
        case 'getDealDetail':
            endpoint = `${endpoint}/negocios-actividades`;
            if (idNegocio && !qs.idEvento) qs.idEvento = idNegocio;
            break;
        case 'createDeal':
            endpoint = `${endpoint}/negocios-actividades`;
            method = 'POST';
            break;
        case 'deleteDeal':
            endpoint = `${endpoint}/negocios-actividades`;
            method = 'DELETE';
            if (idNegocio) qs.idNegocio = idNegocio;
            break;
        case 'getDealsByClient':
            endpoint = `${endpoint}/negocios-contrato/${idAuxi}/${idCtaAuxi}`;
            break;
        case 'getDocuments':
            endpoint = `${endpoint}/documentos/${idNegocio}/archivos`;
            break;
        case 'uploadDocuments':
            endpoint = `${endpoint}/documentos/${idNegocio}/archivos`;
            method = 'POST';
            break;
        case 'getDocumentMeta':
            endpoint = `${endpoint}/documentos/${idNegocio}/archivos/${idDocumento}`;
            break;
        case 'downloadDocument':
            endpoint = `${endpoint}/documentos/${idNegocio}/archivos/${idDocumento}/file`;
            break;
        case 'deleteDocument':
            endpoint = `${endpoint}/documentos/${idNegocio}/${idDocumento}/${nombreArchivo}`;
            method = 'DELETE';
            break;

        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}