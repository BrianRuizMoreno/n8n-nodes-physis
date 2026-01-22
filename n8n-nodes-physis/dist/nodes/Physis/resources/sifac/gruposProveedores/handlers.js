"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const id = this.getNodeParameter('id', index);
    const baseUrl = `/phy2service/api/sifac/grupos/${id}/proveedores`;
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'getCondicionesPago':
            endpoint = `${baseUrl}/condiciones-de-pagos`;
            break;
        case 'updateCondicionesPago':
            endpoint = `${baseUrl}/condiciones-de-pagos`;
            method = 'POST';
            break;
        case 'getDescuentos':
            endpoint = `${baseUrl}/descuentos`;
            break;
        case 'updateDescuentos':
            endpoint = `${baseUrl}/descuentos`;
            method = 'POST';
            break;
        case 'getConexionesContables':
            endpoint = `${baseUrl}/conexiones-contables`;
            break;
        case 'updateConexionesContables':
            endpoint = `${baseUrl}/conexiones-contables`;
            method = 'POST';
            break;
        case 'getTopesCredito':
            endpoint = `${baseUrl}/topes-de-creditos`;
            break;
        case 'updateTopesCredito':
            endpoint = `${baseUrl}/topes-de-creditos`;
            method = 'POST';
            break;
        case 'getVendedores':
            endpoint = `${baseUrl}/vendedores`;
            break;
        case 'updateVendedores':
            endpoint = `${baseUrl}/vendedores`;
            method = 'POST';
            break;
        case 'getObservaciones':
            endpoint = `${baseUrl}/observaciones`;
            break;
        case 'updateObservaciones':
            endpoint = `${baseUrl}/observaciones`;
            method = 'POST';
            break;
        case 'getTransportes':
            endpoint = `${baseUrl}/transportes`;
            break;
        case 'updateTransportes':
            endpoint = `${baseUrl}/transportes`;
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