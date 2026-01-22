"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/comisionistas';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const idCliente = this.getNodeParameter('idCliente', index, '');
    const idLugar = this.getNodeParameter('idLugar', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'get':
            endpoint = `${endpoint}/${id}`;
            break;
        case 'getArbol':
            endpoint = `${endpoint}/arbol`;
            break;
        case 'getArbolAll':
            endpoint = `${endpoint}/arbol_all`;
            break;
        case 'getByCliente':
            endpoint = `${endpoint}/cliente/${idCliente}`;
            break;
        case 'getAutoByCliente':
            endpoint = `${endpoint}/cliente/para-lote`;
            break;
        case 'getClientesOfComisionista':
            endpoint = `${endpoint}/clientesDeComisionista/${id}`;
            break;
        case 'getByLugar':
            endpoint = `${endpoint}/lugar/${idLugar}`;
            break;
        case 'getAvailableForLugar':
            endpoint = `${endpoint}/lugar/disponibles/${idLugar}`;
            break;
        case 'getAutoByLugar':
            endpoint = `${endpoint}/lugar/para-lote`;
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