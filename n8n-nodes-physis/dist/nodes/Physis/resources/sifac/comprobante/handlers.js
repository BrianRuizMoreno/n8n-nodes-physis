"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const idCabecera = this.getNodeParameter('idCabecera', index, '');
    const idMovimiento = this.getNodeParameter('idMovimiento', index, '');
    switch (operation) {
        case 'getCabeceras':
            endpoint = '/phy2service/api/sifac/comprobantes/cabeceras';
            break;
        case 'getConsultaGrid':
            endpoint = '/phy2service/api/sifac/comprobantes/consulta';
            method = 'POST';
            break;
        case 'create':
            endpoint = '/phy2service/api/sifac/comprobantes';
            method = 'POST';
            break;
        case 'getAutorizacionGrid':
            endpoint = '/phy2service/api/sifac/comprobantes/items/autorizacion/consultas';
            method = 'POST';
            break;
        case 'authorizeItem':
            endpoint = `/phy2service/api/sifac/comprobantes/${idCabecera}/items/${idMovimiento}/autorizacion`;
            method = 'PATCH';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (['POST', 'PUT', 'PATCH'].includes(method)) {
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