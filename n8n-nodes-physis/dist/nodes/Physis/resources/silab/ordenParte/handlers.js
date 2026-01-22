"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/silab/ordenes-partes';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = baseUrl;
            break;
        case 'get':
            endpoint = `${baseUrl}/${id}`;
            break;
        case 'upsert':
            endpoint = baseUrl;
            method = 'POST';
            break;
        case 'delete':
            endpoint = baseUrl;
            method = 'DELETE';
            break;
        case 'getPuma':
            endpoint = '/phy2service/api/silab/partes-puma';
            break;
        case 'getDeleted':
            endpoint = '/phy2service/api/silab/partes-eliminados';
            break;
        case 'itemsEstados':
            endpoint = `${baseUrl}/items/estados`;
            method = 'POST';
            break;
        case 'getByPersonal':
            endpoint = `/phy2service/api/silab/personal/${id}/partes`;
            break;
        case 'getByItems':
            endpoint = `/phy2service/api/silab/personal/${id}/partes/items`;
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
    if (operation === 'delete' && id && !qs.IdParteDeLabores) {
        qs.IdParteDeLabores = id;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map