"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    switch (operation) {
        case 'getComisionesComprobante':
            endpoint = '/phy2service/api/sach/comisiones/comisiones-de-comprobante';
            break;
        case 'getComisionesDevengadas':
            endpoint = '/phy2service/api/sach/comisionesdevengadas';
            break;
        case 'getResumenOperaciones':
            endpoint = '/phy2service/api/sach/resumen-de-operaciones';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const idComprobante = this.getNodeParameter('idComprobante', index, '');
    if (idComprobante) {
        qs.IdComprobante = idComprobante;
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