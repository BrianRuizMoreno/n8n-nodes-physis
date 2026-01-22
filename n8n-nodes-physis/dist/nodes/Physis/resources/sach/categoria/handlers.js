"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/categorias';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const idEspecie = this.getNodeParameter('idEspecie', index, '');
    switch (operation) {
        case 'getAll':
            if (idEspecie)
                qs.IdEspecie = idEspecie;
            break;
        case 'get':
            endpoint = `${endpoint}/${id}`;
            if (idEspecie)
                qs.IdEspecie = idEspecie;
            break;
        case 'getArbol':
            endpoint = `${endpoint}/arbol`;
            break;
        case 'getMercado':
            endpoint = `${endpoint}/mercado`;
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
            if (idEspecie)
                qs.IdEspecie = idEspecie;
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