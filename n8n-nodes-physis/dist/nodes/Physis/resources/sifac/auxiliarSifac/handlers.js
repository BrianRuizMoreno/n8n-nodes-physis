"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac';
    const method = 'GET';
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getParametros':
            endpoint = `${endpoint}/parametros`;
            break;
        case 'getParametro':
            endpoint = `${endpoint}/parametros/${id}`;
            break;
        case 'getParametrosFacturaMostrador':
            endpoint = `${endpoint}/parametros-factura-mostrador`;
            break;
        case 'getModulos':
            endpoint = `${endpoint}/modulos`;
            break;
        case 'getReagrupacionesDefault':
            const idAuxi = this.getNodeParameter('idAuxi', index);
            const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
            if (!idAuxi || !idCtaAuxi) {
                throw new Error('Los parámetros idAuxi e idCtaAuxi son requeridos para esta operación.');
            }
            endpoint = `${endpoint}/terceros/${idAuxi}/${idCtaAuxi}/reagrupaciones-default`;
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