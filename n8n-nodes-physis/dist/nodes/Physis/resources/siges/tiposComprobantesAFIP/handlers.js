"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/tipos-comprobantes-afip';
    let endpoint = baseUrl;
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'getAll':
            const tipoIva = this.getNodeParameter('ivaFilter', index, '');
            if (tipoIva && tipoIva !== 'TODOS') {
                qs.iva = tipoIva;
            }
            break;
        case 'get':
            const idGet = this.getNodeParameter('idTipoComprobanteAfip', index);
            const ivaGet = this.getNodeParameter('iva', index);
            endpoint = `${baseUrl}/${idGet}/${ivaGet}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            method = 'DELETE';
            const idDel = this.getNodeParameter('idTipoComprobanteAfip', index);
            const ivaDel = this.getNodeParameter('iva', index);
            endpoint = `${baseUrl}/${idDel}/${ivaDel}`;
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