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
        case 'get':
            endpoint = `${baseUrl}/interdepositos`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdComprobante: this.getNodeParameter('idComprobante', index)
            };
            break;
        case 'getNextId':
            endpoint = `${baseUrl}/interdepositos-nextid`;
            break;
        case 'getMeans':
            endpoint = `${baseUrl}/interdepositos-medios`;
            qs = {
                CodMedio: this.getNodeParameter('codMedio', index),
                Exportable: this.getNodeParameter('exportable', index)
            };
            break;
        case 'getAllMeans':
            endpoint = `${baseUrl}/interdepositos-medios/all`;
            qs = {
                CodMedio: this.getNodeParameter('codMedio', index)
            };
            break;
        case 'getLastExportDate':
            endpoint = `${baseUrl}/interdepositos-ultimafecha`;
            break;
        case 'getShipmentNumbers':
            endpoint = `${baseUrl}/interdepositos-numerosenvio`;
            qs = {
                fecha: this.getNodeParameter('fecha', index)
            };
            break;
        case 'getByDateAndShipment':
            endpoint = `${baseUrl}/interdepositos-Fecha-numeroenvio`;
            qs = {
                fecha: this.getNodeParameter('fecha', index),
                NumeroEnvio: this.getNodeParameter('numeroEnvio', index)
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