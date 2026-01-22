"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/sifac/clientes/descuentos';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getArbol':
            endpoint = `${baseUrl}/arbol`;
            break;
        case 'get':
            endpoint = `${baseUrl}/${id}`;
            break;
        case 'getByAlias': {
            const alias = this.getNodeParameter('alias', index);
            if (!alias) {
                throw new Error('El parámetro "alias" es obligatorio para esta operación.');
            }
            endpoint = `/phy2service/api/sifac/clientes/descuentos-by-alias/${alias}`;
            break;
        }
        case 'create':
            endpoint = baseUrl;
            method = 'POST';
            break;
        case 'update':
            endpoint = baseUrl;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${baseUrl}/${id}`;
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