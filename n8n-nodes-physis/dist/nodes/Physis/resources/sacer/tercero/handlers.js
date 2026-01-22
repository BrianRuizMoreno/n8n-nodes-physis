"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    const method = 'GET';
    const body = {};
    let qs = {};
    switch (operation) {
        case 'getProductores':
            endpoint = '/phy2service/api/sacer/productores';
            break;
        case 'getCorredores':
            endpoint = '/phy2service/api/sacer/corredores';
            break;
        case 'getTransportistas':
            endpoint = '/phy2service/api/sacer/transportistas';
            break;
        case 'getByTipo': {
            const codTipoTercero = this.getNodeParameter('codTipoTercero', index);
            endpoint = `/phy2service/api/sacer/tipos-tercero/${codTipoTercero}/terceros`;
            break;
        }
        case 'getDomicilios': {
            const idAuxi = this.getNodeParameter('idAuxi', index);
            const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
            endpoint = `/phy2service/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/terceros/domicilios`;
            break;
        }
        case 'getDomicilio': {
            const idAuxi = this.getNodeParameter('idAuxi', index);
            const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
            const codDomicilio = this.getNodeParameter('codDomicilio', index);
            endpoint = `/phy2service/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/terceros/domicilios/${codDomicilio}`;
            break;
        }
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            qs = { ...qs, ...json };
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