"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/fijaciones';
    let method = 'GET';
    let body = {};
    let qs = {};
    const codCampania = this.getNodeParameter('codCampania', index, '');
    const nroContrato = this.getNodeParameter('nroContrato', index, '');
    const nroFijacion = this.getNodeParameter('nroFijacion', index, '');
    const idFijacion = this.getNodeParameter('idFijacion', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'getByContract':
            endpoint = `/phy2service/api/sacer/campanias/${codCampania}/contratos/${nroContrato}/fijaciones`;
            break;
        case 'get':
            endpoint = `${endpoint}/${nroContrato}/${codCampania}/${nroFijacion}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${endpoint}/${idFijacion}`;
            method = 'DELETE';
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