"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/facturas';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'emitir':
            method = 'POST';
            break;
        case 'emitirPorLotes':
            endpoint = `${endpoint}/delotes`;
            method = 'POST';
            break;
        case 'anular':
            endpoint = `${endpoint}/anula-con-ncd`;
            method = 'POST';
            break;
        case 'listar':
            endpoint = `${endpoint}/all`;
            break;
        default:
            break;
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