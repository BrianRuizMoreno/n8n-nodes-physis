"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    const body = {};
    switch (operation) {
        case 'getAll':
            endpoint = `${baseUrl}/comprobantes-pendientes`;
            break;
        case 'getDetailed':
            endpoint = `${baseUrl}/comprobamtes-pendientes-all-detallados`;
            break;
        case 'get':
            const id = this.getNodeParameter('idComprobante', index);
            endpoint = `${baseUrl}/comprobantes-pendientes/${id}`;
            const idUsuarioGet = this.getNodeParameter('idUsuario', index, 0);
            if (idUsuarioGet !== 0) {
                qs.IdUsuario = idUsuarioGet;
            }
            break;
        case 'getSummary':
            endpoint = `${baseUrl}/comprobantes-pendientes-all-cantidades`;
            break;
        case 'getErrorCounts':
            endpoint = `${baseUrl}/comprobantes-pendientes-cuantos-erroneos`;
            qs = {
                idPpal: this.getNodeParameter('idPpal', index),
                IdUsuario: this.getNodeParameter('idUsuario', index)
            };
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            qs = { ...qs, ...json };
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