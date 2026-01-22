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
        case 'checkAvailability':
            endpoint = `${baseUrl}/valores-disponibilidad-existen-comprobantes`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdComprobante: this.getNodeParameter('idComprobante', index)
            };
            break;
        case 'checkNegotiated':
            endpoint = `${baseUrl}/valores-negociados-existen-comprobantes`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdComprobante: this.getNodeParameter('idComprobante', index)
            };
            break;
        case 'getLastCheckNumber':
            endpoint = `${baseUrl}/valores-numero-cheque`;
            qs = {
                IdBanco: this.getNodeParameter('idBanco', index),
                IdCuentaBancaria: this.getNodeParameter('idCuentaBancaria', index),
                IdChequera: this.getNodeParameter('idChequera', index)
            };
            break;
        case 'getReceivedValues':
            endpoint = `${baseUrl}/valores-recibidos`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdComprobante: this.getNodeParameter('idComprobante', index),
                Entrega: this.getNodeParameter('entrega', index),
                Electronico: this.getNodeParameter('electronico', index, 0)
            };
            const tipoRecCau = this.getNodeParameter('tipoRecCau', index, 0);
            if (tipoRecCau !== 0) {
                qs.TipoRecCau = tipoRecCau;
            }
            break;
        case 'getElectronicBatches':
            endpoint = `${baseUrl}/valores-electronicos-NumeroEnvio`;
            qs = {
                sCodBanco: this.getNodeParameter('idBanco', index),
                lCuentaBancaria: this.getNodeParameter('idCuentaBancaria', index),
                sTipoConsulta: this.getNodeParameter('tipoConsulta', index)
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