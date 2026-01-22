"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/sifac';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = `${baseUrl}/productos`;
            break;
        case 'getArbol':
            endpoint = `${baseUrl}/productos/arbol`;
            break;
        case 'getConsultaGrid':
            endpoint = `${baseUrl}/productos/consultar`;
            method = 'POST';
            break;
        case 'getEstructura':
            endpoint = `${baseUrl}/productos/estructura-de-productos`;
            break;
        case 'getStockDisponible':
            endpoint = `${baseUrl}/productos/${id}/stock-disponible`;
            break;
        case 'getSaldos':
            endpoint = `${baseUrl}/saldos/productos/${id}`;
            break;
        case 'getPesos':
            endpoint = `${baseUrl}/productos/${id}/pesos`;
            break;
        case 'getPrecios':
            endpoint = `${baseUrl}/precios/productos/${id}`;
            break;
        case 'updatePrecios':
            endpoint = `${baseUrl}/productos/${id}/lista-precios`;
            method = 'POST';
            break;
        case 'getPreciosExistencia':
            endpoint = `${baseUrl}/productos/precios-existencia`;
            break;
        case 'getSettings':
            endpoint = `${baseUrl}/productos/${id}/settings`;
            break;
        case 'blockProducto':
            endpoint = `${baseUrl}/productos/piezas/bloqueo`;
            method = 'POST';
            break;
        case 'unblockProducto':
            endpoint = `${baseUrl}/productos/piezas/desbloqueo`;
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