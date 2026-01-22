"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    let method = 'GET';
    let body = {};
    let qs = {};
    const nroContrato = this.getNodeParameter('nroContrato', index, '');
    const codCampania = this.getNodeParameter('codCampania', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = `${endpoint}/contratos`;
            break;
        case 'create':
            endpoint = `${endpoint}/contratos`;
            method = 'POST';
            break;
        case 'get':
            endpoint = `${endpoint}/campanias/${codCampania}/contratos/${nroContrato}`;
            break;
        case 'getContratosTerceros':
            endpoint = `${endpoint}/contratosTerceros`;
            break;
        case 'getCorredores':
            endpoint = `${endpoint}/contrato-corredores`;
            break;
        case 'getEntregadores':
            endpoint = `${endpoint}/entregadores`;
            break;
        case 'getTransportistas':
            endpoint = `${endpoint}/transportistas`;
            break;
        case 'getTerceros':
            endpoint = `${endpoint}/terceros`;
            break;
        case 'getMonedas':
            endpoint = `${endpoint}/monedas`;
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