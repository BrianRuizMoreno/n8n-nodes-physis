"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'getAll':
            endpoint = `${baseUrl}/autorizantes`;
            break;
        case 'getPasesPendientes':
            endpoint = `${baseUrl}/pases/pendientes`;
            break;
        case 'updatePase':
            endpoint = `${baseUrl}/pases`;
            method = 'PATCH';
            break;
        case 'updatePasePut':
            endpoint = `${baseUrl}/pases`;
            method = 'PUT';
            break;
        case 'getAfectaciones':
            endpoint = `${baseUrl}/pases-cab-afectaciones`;
            method = 'POST';
            break;
        case 'getSinAfectar':
            endpoint = `${baseUrl}/pases-ref-sin-afectaciones`;
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
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