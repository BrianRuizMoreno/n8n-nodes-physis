"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    let method = 'GET';
    let body = [];
    let qs = {};
    switch (operation) {
        case 'getCosechero':
            endpoint = `${endpoint}/tarifas-cosechero`;
            qs.codCereal = this.getNodeParameter('codCereal', index);
            qs.codCampo = this.getNodeParameter('codCampo', index);
            break;
        case 'createCosechero':
            endpoint = `${endpoint}/tarifas-cosechero`;
            method = 'POST';
            break;
        case 'deleteCosechero':
            endpoint = `${endpoint}/tarifas-cosechero`;
            method = 'DELETE';
            qs.codCereal = this.getNodeParameter('codCereal', index);
            qs.codCampo = this.getNodeParameter('codCampo', index);
            break;
        case 'getSecado':
            endpoint = `${endpoint}/tarifa-secado`;
            qs.codCereal = this.getNodeParameter('codCereal', index);
            qs.codPlanta = this.getNodeParameter('codPlanta', index);
            break;
        case 'createSecado':
            endpoint = `${endpoint}/tarifa-secado`;
            method = 'POST';
            break;
        case 'deleteSecado':
            endpoint = `${endpoint}/tarifa-secado`;
            method = 'DELETE';
            qs.codCereal = this.getNodeParameter('codCereal', index);
            qs.codPlanta = this.getNodeParameter('codPlanta', index);
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