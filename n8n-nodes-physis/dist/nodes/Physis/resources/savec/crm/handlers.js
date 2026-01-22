"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    let method = 'GET';
    let body = {};
    let qs = {};
    const idNegocio = this.getNodeParameter('idNegocio', index, '');
    const idActividad = this.getNodeParameter('idActividad', index, '');
    const idDocumento = this.getNodeParameter('idDocumento', index, '');
    const idAuxi = this.getNodeParameter('idAuxi', index, '');
    const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '');
    const nombreArchivo = this.getNodeParameter('nombreArchivo', index, '');
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
            if (idNegocio)
                qs.idNegocio = idNegocio;
            if (idActividad)
                qs.idActividad = idActividad;
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
            if (idNegocio)
                qs.idEvento = idNegocio;
            break;
        case 'createDeal':
            endpoint = `${endpoint}/negocios-actividades`;
            method = 'POST';
            break;
        case 'deleteDeal':
            endpoint = `${endpoint}/negocios-actividades`;
            method = 'DELETE';
            if (idNegocio)
                qs.idNegocio = idNegocio;
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
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT') {
                body = json;
            }
            else {
                qs = { ...qs, ...json };
            }
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map