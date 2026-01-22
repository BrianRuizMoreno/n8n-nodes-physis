"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/plazos';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'get':
            endpoint = `${endpoint}/${id}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${endpoint}/${id}`;
            method = 'DELETE';
            break;
        case 'searchV2':
            endpoint = '/phy2service/api/sach/v2/plazos';
            break;
        case 'getByCliente':
            endpoint = `${endpoint}/bycliente`;
            break;
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        let json;
        try {
            json = JSON.parse(rawJson);
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
        if (operation === 'searchV2') {
            qs.consulta = rawJson;
        }
        else if (method === 'POST' || method === 'PUT') {
            body = json;
        }
        else {
            qs = { ...qs, ...json };
        }
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map