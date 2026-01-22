"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '');
    switch (operation) {
        case 'getArbol':
            endpoint = '/phy2service/api/sacer/zonas-establecimientos-campos-lotes/arbol';
            if (id)
                qs.IdAuxi = id;
            if (idCtaAuxi)
                qs.IdCtaAuxi = idCtaAuxi;
            break;
        case 'getCampos':
            endpoint = '/phy2service/api/sacer/campos';
            break;
        case 'getCampo':
            endpoint = `/phy2service/api/sacer/campos/${id}`;
            break;
        case 'createCampo':
            endpoint = '/phy2service/api/sacer/campos';
            method = 'POST';
            break;
        case 'updateCampo':
            endpoint = '/phy2service/api/sacer/campos';
            method = 'PUT';
            break;
        case 'deleteCampo':
            endpoint = `/phy2service/api/sacer/campos/${id}`;
            method = 'DELETE';
            break;
        case 'getEstablecimientos':
            endpoint = '/phy2service/api/sacer/establecimientos';
            break;
        case 'getEstablecimiento':
            endpoint = `/phy2service/api/sacer/terceros/establecimientos/${id}`;
            break;
        case 'getEstablecimientosTercero':
            endpoint = `/phy2service/api/sacer/terceros/${id}/${idCtaAuxi}/establecimientos`;
            break;
        case 'createEstablecimiento':
            endpoint = '/phy2service/api/sacer/establecimientos';
            method = 'POST';
            break;
        case 'updateEstablecimiento':
            endpoint = '/phy2service/api/sacer/establecimientos';
            method = 'PUT';
            break;
        case 'deleteEstablecimiento':
            endpoint = `/phy2service/api/sacer/Establecimientos/${id}`;
            method = 'DELETE';
            break;
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const parsedJson = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT') {
                body = parsedJson;
            }
            else {
                qs = { ...qs, ...parsedJson };
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