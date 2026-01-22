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
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = `${baseUrl}/comprobantes`;
            break;
        case 'getAllPaginated':
            endpoint = `${baseUrl}/comprobantes-all-paginados`;
            break;
        case 'get':
            endpoint = `${baseUrl}/comprobantes/${id}`;
            break;
        case 'create':
            endpoint = `${baseUrl}/comprobantes`;
            method = 'POST';
            break;
        case 'update':
            endpoint = `${baseUrl}/comprobantes`;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${baseUrl}/comprobantes`;
            method = 'DELETE';
            qs.advertencia = this.getNodeParameter('advertencia', index, false);
            break;
        case 'createOPMasivas':
            endpoint = `${baseUrl}/comprobantes/OPMasivos`;
            method = 'POST';
            qs = {
                IdUsuario: this.getNodeParameter('additionalField', index, 0),
                eProceso: 1
            };
            break;
        case 'checkExternalExists':
            endpoint = `${baseUrl}/comprobantes/ExisteComprobanteExterno`;
            break;
        case 'getPendientesPago':
            endpoint = `${baseUrl}/comprobantes/pendientes_a_pagar`;
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (operation === 'delete') {
                qs.comprobante = JSON.stringify(json);
            }
            else if (method === 'POST' || method === 'PUT') {
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
    if (operation === 'get' && !qs.idEjercicio) {
        throw new Error('El campo "idEjercicio" es obligatorio en el JSON Body para obtener un comprobante.');
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map