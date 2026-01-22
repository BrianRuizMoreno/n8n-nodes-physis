"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/formatos';
    let method = 'GET';
    let body = {};
    let qs = {};
    const idFormato = this.getNodeParameter('id', index, '');
    const idTipoFormato = this.getNodeParameter('idTipoFormato', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'getByType':
            endpoint = `/phy2service/api/sacer/tipos-formato/${idTipoFormato}/formatos`;
            break;
        case 'get':
            endpoint = `/phy2service/api/sacer/tipos-formato/${idTipoFormato}/formatos/${idFormato}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${endpoint}/${idFormato}`;
            method = 'DELETE';
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