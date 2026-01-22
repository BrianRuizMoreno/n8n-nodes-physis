"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/calidades';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const codCereal = this.getNodeParameter('codCereal', index, '');
    const codAgrupacion = this.getNodeParameter('codAgrupacion', index, '');
    try {
        const jsonBody = this.getNodeParameter('jsonBody', index, '');
        if (jsonBody) {
            const json = JSON.parse(jsonBody);
            if (['create', 'update', 'tableSearch'].includes(operation)) {
                body = json;
            }
            else {
                qs = json;
            }
        }
    }
    catch (error) {
        throw new Error(`JSON body inválido: ${error.message}`);
    }
    if (operation === 'getAll') {
        if (codCereal)
            qs.codCereal = codCereal;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'tableSearch') {
        endpoint = `${endpoint}/consulta`;
        method = 'POST';
    }
    else if (operation === 'getByCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${codCereal}/calidades`;
    }
    else if (operation === 'getAgrupacionesByCereal') {
        endpoint = `/phy2service/api/sacer/cereales/${codCereal}/calidades/agrupaciones`;
    }
    else if (operation === 'getAgrupacion') {
        endpoint = `/phy2service/api/sacer/calidades/agrupaciones/${codAgrupacion}`;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map