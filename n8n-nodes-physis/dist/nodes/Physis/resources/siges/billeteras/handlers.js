"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/billeteras';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'getAll':
            endpoint = baseUrl;
            break;
        case 'get':
            const idAuxi = this.getNodeParameter('idAuxi', index);
            const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
            endpoint = `${baseUrl}/${idAuxi}/${idCtaAuxi}`;
            break;
        case 'getPendingMovements':
            endpoint = `${baseUrl}/movimientos-sin-informar`;
            break;
        case 'updateMovementStatus':
            endpoint = `${baseUrl}/movimientos-sin-informar`;
            method = 'PUT';
            qs = {
                idMov: this.getNodeParameter('idMov', index),
                posicion: this.getNodeParameter('posicion', index)
            };
            break;
        case 'createOperation':
            endpoint = `${baseUrl}/bica/operaciones`;
            method = 'POST';
            break;
        case 'processDailyBalance':
            endpoint = `${baseUrl}/bica/balances/diario`;
            method = 'POST';
            break;
        case 'refreshBalances':
            endpoint = `${baseUrl}/bica/saldos`;
            method = 'POST';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT') {
                body = { ...body, ...json };
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