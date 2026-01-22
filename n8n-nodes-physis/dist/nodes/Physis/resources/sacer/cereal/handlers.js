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
        case 'getCereales':
            endpoint = '/phy2service/api/sacer/cereales';
            break;
        case 'getCerealesGrid':
            endpoint = '/phy2service/api/sacer/cereales/consultas';
            method = 'POST';
            break;
        case 'getCereal':
            endpoint = `/phy2service/api/sacer/cereales/${id}`;
            break;
        case 'createCereal':
            endpoint = '/phy2service/api/sacer/cereales';
            method = 'POST';
            break;
        case 'updateCereal':
            endpoint = '/phy2service/api/sacer/cereales';
            method = 'PUT';
            break;
        case 'deleteCereal':
            endpoint = `/phy2service/api/sacer/cereales/${id}`;
            method = 'DELETE';
            break;
        case 'getVariedades':
            endpoint = `/phy2service/api/sacer/cereales/${id}/variedades`;
            break;
        case 'getProductosCereal':
            endpoint = `/phy2service/api/sacer/cereales/${id}/productos`;
            break;
        case 'addProductosCereal':
            endpoint = `/phy2service/api/sacer/cereales/${id}/productos`;
            method = 'POST';
            break;
        case 'getCalidades':
            endpoint = '/phy2service/api/sacer/calidades';
            break;
        case 'getCalidadesGrid':
            endpoint = '/phy2service/api/sacer/calidades/consulta';
            method = 'POST';
            break;
        case 'getCalidad':
            endpoint = `/phy2service/api/sacer/calidades/${id}`;
            break;
        case 'createCalidad':
            endpoint = '/phy2service/api/sacer/calidades';
            method = 'POST';
            break;
        case 'updateCalidad':
            endpoint = '/phy2service/api/sacer/calidades';
            method = 'PUT';
            break;
        case 'deleteCalidad':
            endpoint = `/phy2service/api/sacer/calidades/${id}`;
            method = 'DELETE';
            break;
        case 'getCalidadesPorCereal':
            endpoint = `/phy2service/api/sacer/cereales/${id}/calidades`;
            break;
        case 'getAgrupacionesPorCereal':
            endpoint = `/phy2service/api/sacer/cereales/${id}/calidades/agrupaciones`;
            break;
        case 'getAgrupacion':
            endpoint = `/phy2service/api/sacer/calidades/agrupaciones/${id}`;
            break;
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (operation === 'addProductosCereal') {
                qs.productosJson = JSON.stringify(json);
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
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map