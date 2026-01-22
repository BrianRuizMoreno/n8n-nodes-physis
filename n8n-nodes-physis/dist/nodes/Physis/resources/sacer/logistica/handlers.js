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
    const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '');
    switch (operation) {
        case 'getConductores':
            endpoint = '/phy2service/api/sacer/conductores';
            break;
        case 'getConductoresGrid':
            endpoint = '/phy2service/api/sacer/v2/conductores';
            break;
        case 'getConductor':
            endpoint = `/phy2service/api/sacer/conductores/${id}`;
            break;
        case 'getConductoresTransportista':
            endpoint = `/phy2service/api/sacer/transportistas/${id}/${idCtaAuxi}/conductores`;
            break;
        case 'createConductor':
            endpoint = '/phy2service/api/sacer/Conductores';
            method = 'POST';
            break;
        case 'updateConductor':
            endpoint = '/phy2service/api/sacer/Conductores';
            method = 'PUT';
            break;
        case 'deleteConductor':
            endpoint = `/phy2service/api/sacer/Conductores/${id}`;
            method = 'DELETE';
            break;
        case 'getTarifas':
            endpoint = '/phy2service/api/sacer/tarifas';
            break;
        case 'getTarifasGrid':
            endpoint = '/phy2service/api/sacer/v2/tarifas';
            break;
        case 'getTarifa':
            endpoint = `/phy2service/api/sacer/tarifas/${id}`;
            break;
        case 'createTarifa':
            endpoint = '/phy2service/api/sacer/tarifas';
            method = 'POST';
            break;
        case 'updateTarifa':
            endpoint = '/phy2service/api/sacer/tarifas';
            method = 'PUT';
            break;
        case 'deleteTarifa':
            endpoint = `/phy2service/api/sacer/tarifas/${id}`;
            method = 'DELETE';
            break;
        case 'getImputacionesTarifa':
            endpoint = `/phy2service/api/sacer/tarifas/${id}/imputaciones`;
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