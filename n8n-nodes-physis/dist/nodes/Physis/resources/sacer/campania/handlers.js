"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/campanias';
    let method = 'GET';
    let body = {};
    const qs = {};
    const id = this.getNodeParameter('id', index, '');
    const idUsuario = this.getNodeParameter('idUsuario', index, '');
    try {
        const jsonBody = this.getNodeParameter('jsonBody', index, '');
        if (jsonBody) {
            const json = JSON.parse(jsonBody);
            body = json;
        }
    }
    catch (error) {
        throw new Error(`JSON body inválido: ${error.message}`);
    }
    if (operation === 'getAll') {
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
    else if (operation === 'getByUser') {
        endpoint = `/phy2service/api/sacer/usuarios/${idUsuario}/campanias`;
    }
    else if (operation === 'getDetailByUser') {
        endpoint = `/phy2service/api/sacer/usuarios/${idUsuario}/campanias/${id}`;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map