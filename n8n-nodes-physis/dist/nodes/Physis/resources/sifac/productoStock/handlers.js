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
    const idDeposito = this.getNodeParameter('idDeposito', index, '');
    switch (operation) {
        case 'getStock':
            endpoint = `${baseUrl}/productos/${id}/stock`;
            break;
        case 'getStockByDeposito':
            if (idDeposito && id) {
                endpoint = `${baseUrl}/depositos/${idDeposito}/productos/${id}/stock`;
            }
            else if (idDeposito) {
                endpoint = `${baseUrl}/depositos/${idDeposito}/productos`;
            }
            else {
                endpoint = `${baseUrl}/depositos/productos/stock`;
            }
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
        case 'getMovimientos':
            endpoint = `${baseUrl}/productos/${id}/stock/movimientos`;
            break;
        case 'createMovimiento':
            endpoint = `${baseUrl}/productos/stock/movimientos`;
            method = 'POST';
            break;
        case 'updateMovimiento':
            endpoint = `${baseUrl}/productos/stock/movimientos`;
            method = 'PATCH';
            break;
        case 'createFirma': {
            const idCab = this.getNodeParameter('idCabecera', index);
            const idFirma = this.getNodeParameter('idFirma', index);
            if (!idCab || !idFirma) {
                throw new Error('Se requieren "idCabecera" e "idFirma" para esta operación.');
            }
            endpoint = `${baseUrl}/productos/stock/movimientos/${idCab}/firmas/${idFirma}`;
            method = 'POST';
            break;
        }
        case 'search':
            endpoint = `${baseUrl}/productos`;
            break;
        case 'searchAdvanced':
            endpoint = `${baseUrl}/productos/consultar`;
            method = 'POST';
            break;
        case 'getArbol':
            endpoint = `${baseUrl}/productos/arbol`;
            break;
        case 'getSettings':
            endpoint = `${baseUrl}/productos/${id}/settings`;
            break;
        case 'getStructure':
            endpoint = `${baseUrl}/productos/estructura-de-productos`;
            break;
        case 'bloqueo':
            endpoint = `${baseUrl}/productos/piezas/bloqueo`;
            method = 'POST';
            break;
        case 'desbloqueo':
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
            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
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