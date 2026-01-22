"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getPlantas':
            endpoint = '/phy2service/api/sacer/plantas';
            break;
        case 'getPlanta':
            endpoint = `/phy2service/api/sacer/plantas/${id}`;
            break;
        case 'getNumeradoresPlanta':
            endpoint = `/phy2service/api/sacer/plantas/${id}/numeradores`;
            break;
        case 'createPlanta':
            endpoint = '/phy2service/api/sacer/plantas';
            method = 'POST';
            break;
        case 'updatePlanta':
            endpoint = '/phy2service/api/sacer/plantas';
            method = 'PUT';
            break;
        case 'deletePlanta':
            endpoint = `/phy2service/api/sacer/plantas/${id}`;
            method = 'DELETE';
            break;
        case 'getSilos':
            endpoint = '/phy2service/api/sacer/Silos';
            break;
        case 'getSilo':
            endpoint = `/phy2service/api/sacer/Silos/${id}`;
            break;
        case 'createSilo':
            endpoint = '/phy2service/api/sacer/Silos';
            method = 'POST';
            break;
        case 'updateSilo':
            endpoint = '/phy2service/api/sacer/Silos';
            method = 'PUT';
            break;
        case 'deleteSilo':
            endpoint = `/phy2service/api/sacer/Silos/${id}`;
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