"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/pesaje';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAllBasculas':
            endpoint = `${baseUrl}/basculas`;
            break;
        case 'getBascula':
            endpoint = `${baseUrl}/basculas/${id}`;
            break;
        case 'getBasculaPeso':
            endpoint = `${baseUrl}/basculas/${id}/peso`;
            break;
        case 'getAllTickets':
            endpoint = `${baseUrl}/tickets`;
            break;
        case 'getTicket':
            endpoint = `${baseUrl}/tickets/${id}`;
            break;
        case 'openTicket':
            endpoint = `${baseUrl}/tickets/abrir`;
            method = 'POST';
            break;
        case 'updateTicket':
            endpoint = `${baseUrl}/tickets/${id}`;
            method = 'PUT';
            break;
        case 'closeTicket':
            endpoint = `${baseUrl}/tickets/${id}/cerrar`;
            method = 'POST';
            break;
        case 'voidTicket':
            endpoint = `${baseUrl}/tickets/${id}/anular`;
            method = 'PUT';
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