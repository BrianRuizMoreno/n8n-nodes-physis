"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/usuarios';
    let endpoint = baseUrl;
    let method = 'GET';
    let body = {};
    let qs = {};
    const idUsuario = this.getNodeParameter('id', index, '');
    const idAuxi = this.getNodeParameter('idAuxi', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'get':
            endpoint = `${baseUrl}/${idUsuario}`;
            break;
        case 'getTerceros':
            endpoint = `${baseUrl}/${idUsuario}/terceros/${idAuxi}`;
            break;
        case 'linkTercero':
            endpoint = `${baseUrl}/${idUsuario}/terceros/${idAuxi}`;
            method = 'POST';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST') {
                body = json;
            }
            else {
                if (typeof json === 'object' && !Array.isArray(json) && json !== null) {
                    qs = { ...qs, ...json };
                }
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