"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'listSignatories':
            endpoint = `${baseUrl}/firmantes-all`;
            break;
        case 'checkSubjournalDate':
            endpoint = `${baseUrl}/subdiario-controla-fechas`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdPpal: this.getNodeParameter('idPpal', index),
                IdTipoComprobante: this.getNodeParameter('idTipoComprobante', index),
                Fecha: this.getNodeParameter('fecha', index)
            };
            break;
        case 'checkIvaRefundStatus':
            endpoint = `${baseUrl}/iva-devolucion-comprobantes-registrados`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdComprobante: this.getNodeParameter('idComprobante', index)
            };
            break;
        case 'createThirdPartyVoucher':
            method = 'POST';
            endpoint = `${baseUrl}/comprobantedetercero`;
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (operation === 'createThirdPartyVoucher') {
                body = Array.isArray(json) ? json : [json];
            }
            else if (method === 'POST' || method === 'PUT') {
                body = json;
            }
            else {
                if (typeof json === 'object' && !Array.isArray(json) && json !== null) {
                    qs = { ...qs, ...json };
                }
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