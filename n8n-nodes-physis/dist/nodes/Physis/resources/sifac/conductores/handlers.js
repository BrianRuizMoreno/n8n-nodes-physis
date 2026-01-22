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
    const baseUrlSifac = '/phy2service/api/sifac/conductores';
    const baseUrlSacer = '/phy2service/api/sacer/v2/conductores';
    switch (operation) {
        case 'getAll':
            endpoint = baseUrlSifac;
            break;
        case 'getGrid':
            endpoint = baseUrlSacer;
            break;
        case 'get':
            endpoint = `${baseUrlSifac}/${id}`;
            break;
        case 'create':
            endpoint = baseUrlSifac;
            method = 'POST';
            break;
        case 'update':
            endpoint = `${baseUrlSifac}/${id}`;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${baseUrlSifac}/${id}`;
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