"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    switch (operation) {
        case 'getPending':
            endpoint = `${baseUrl}/afectacion/cabeceras`;
            const estadoPending = this.getNodeParameter('estado', index);
            const signoPending = this.getNodeParameter('signo', index);
            const comprobantePending = this.getNodeParameter('comprobante', index, '');
            qs = {
                Estado: estadoPending,
                Signo: signoPending
            };
            if (comprobantePending) {
                qs.Comprobante = comprobantePending;
            }
            break;
        case 'getAffectedDetails':
            endpoint = `${baseUrl}/afectacion/comprobanteafectado`;
            const estadoDetails = this.getNodeParameter('estado', index);
            const signoDetails = this.getNodeParameter('signo', index);
            const comprobanteDetails = this.getNodeParameter('comprobante', index);
            qs = {
                Comprobante: comprobanteDetails,
                Estado: estadoDetails,
                Signo: signoDetails
            };
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