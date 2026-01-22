"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac/clientes';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getPagoArbol':
            endpoint += '/condiciones-de-pagos/arbol';
            break;
        case 'getPago':
            endpoint += `/condiciones-de-pagos/${id}`;
            break;
        case 'getPagoManuales':
            endpoint += `/condiciones-de-pagos/vencimientos-manuales/${id}`;
            break;
        case 'createPago':
            endpoint += '/condiciones-de-pagos';
            method = 'POST';
            break;
        case 'updatePago':
            endpoint += '/condiciones-de-pagos';
            method = 'PUT';
            break;
        case 'deletePago':
            endpoint += `/condiciones-de-pagos/${id}`;
            method = 'DELETE';
            break;
        case 'getDescuentoArbol':
            endpoint += '/descuentos/arbol';
            break;
        case 'getDescuento':
            endpoint += `/descuentos/${id}`;
            break;
        case 'getDescuentoByAlias':
            endpoint += `/descuentos-by-alias/${id}`;
            break;
        case 'createDescuento':
            endpoint += '/descuentos';
            method = 'POST';
            break;
        case 'updateDescuento':
            endpoint += '/descuentos';
            method = 'PUT';
            break;
        case 'deleteDescuento':
            endpoint += `/descuentos/${id}`;
            method = 'DELETE';
            break;
        case 'getObservacionArbol':
            endpoint += '/observaciones/arbol';
            break;
        case 'createObservacion':
            endpoint += '/observaciones';
            method = 'POST';
            break;
        case 'updateObservacion':
            endpoint += '/observaciones';
            method = 'PUT';
            break;
        case 'deleteObservacion':
            endpoint += `/observaciones/${id}`;
            method = 'DELETE';
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