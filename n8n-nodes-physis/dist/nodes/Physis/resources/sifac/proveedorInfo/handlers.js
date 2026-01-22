"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac/proveedores';
    const method = 'GET';
    let qs = {};
    switch (operation) {
        case 'getConexiones':
            endpoint += '/conexiones-contables';
            break;
        case 'getCondicionesPago':
            endpoint += '/condiciones-de-pagos';
            break;
        case 'getTopesCredito':
            endpoint += '/topes-de-creditos';
            break;
        case 'getTransportes':
            endpoint += '/transportes';
            break;
        case 'getCompradores':
            endpoint += '/compradores';
            break;
        case 'getObservaciones':
            endpoint += '/observaciones';
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
    const response = await transport.request(method, endpoint, {}, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map