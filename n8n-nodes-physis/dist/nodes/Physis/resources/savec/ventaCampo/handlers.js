"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    const method = 'GET';
    const body = {};
    let qs = {};
    switch (operation) {
        case 'getCampos':
            endpoint = `${endpoint}/campos`;
            break;
        case 'getTiposComprobantes':
            endpoint = `${endpoint}/tipos-comprobantes`;
            break;
        case 'getCorredores':
            endpoint = `${endpoint}/corredores`;
            break;
        case 'getCompradores':
            endpoint = `${endpoint}/compradores`;
            break;
        case 'getLiquidaciones':
            endpoint = `${endpoint}/liquidaciones`;
            break;
        case 'getCartasPorte':
            endpoint = `${endpoint}/cartas-porte`;
            break;
        case 'getVentas':
            endpoint = `${endpoint}/ventas-campo`;
            break;
        case 'getVentasDetallado':
            endpoint = `${endpoint}/ventas-campo-detallado`;
            break;
        case 'getEmpresa':
            endpoint = `${endpoint}/empresa`;
            break;
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
    if (['getLiquidaciones', 'getCartasPorte'].includes(operation)) {
        if (!qs.filtro && Object.keys(qs).length > 0) {
            qs = { filtro: JSON.stringify(qs) };
        }
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map