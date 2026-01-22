"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/estados';
    let method = 'GET';
    let body = {};
    const qs = {};
    let id = '';
    try {
        id = this.getNodeParameter('id', index);
    }
    catch (e) { }
    try {
        const json = JSON.parse(this.getNodeParameter('jsonBody', index));
        if (['create', 'update', 'search'].includes(operation)) {
            body = json;
        }
    }
    catch (e) { }
    if (operation === 'getAll') {
        endpoint = endpoint;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'search') {
        endpoint = `${endpoint}/consulta`;
        method = 'POST';
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map