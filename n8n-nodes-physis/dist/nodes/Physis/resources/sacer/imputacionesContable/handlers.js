"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sacer/imputaciones-contables';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'getAll':
            qs.CodCereal = this.getNodeParameter('codCereal', index);
            qs.CodPlanta = this.getNodeParameter('codPlanta', index);
            qs.CodTipoFormulario = this.getNodeParameter('codTipoFormulario', index);
            qs.CodClase = this.getNodeParameter('codClase', index);
            const retenPercep = this.getNodeParameter('retenPercep', index, 0);
            if (retenPercep)
                qs.RetenPercep = retenPercep;
            break;
        case 'get': {
            const id = this.getNodeParameter('codImputacion', index);
            endpoint = `${endpoint}/${id}`;
            break;
        }
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete': {
            const id = this.getNodeParameter('codImputacion', index);
            endpoint = `${endpoint}/${id}`;
            method = 'DELETE';
            break;
        }
        case 'getRegimenes':
            endpoint = '/phy2service/api/sacer/imputaciones-contables/regimenes';
            const idCtaPpal = this.getNodeParameter('idCtaPpal', index, '');
            if (idCtaPpal)
                qs.idCtaPpal = idCtaPpal;
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