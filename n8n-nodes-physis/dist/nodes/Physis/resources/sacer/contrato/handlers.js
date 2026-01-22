"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/contratos';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const codCampania = this.getNodeParameter('codCampania', index, '');
    const nroContrato = this.getNodeParameter('nroContrato', index, '');
    const idAuxi = this.getNodeParameter('idAuxi', index, '');
    const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'getByTercero':
            endpoint = `/phy2service/api/sacer/terceros/${idAuxi}/${idCtaAuxi}/contratos`;
            break;
        case 'get':
            endpoint = `/phy2service/api/sacer/campanias/${codCampania}/contratos/${nroContrato}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${endpoint}/${id}`;
            method = 'DELETE';
            break;
        case 'tableSearch':
            endpoint = `${endpoint}/consultas`;
            method = 'POST';
            break;
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