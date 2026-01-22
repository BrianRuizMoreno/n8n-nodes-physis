"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlGlobal = '/phy2service/api/siges/numeradores';
    const baseUrlEjercicio = '/phy2service/api/siges/ejercicios';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const idEjercicio = this.getNodeParameter('idEjercicio', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = idEjercicio
                ? `${baseUrlEjercicio}/${idEjercicio}/numeradores`
                : baseUrlGlobal;
            break;
        case 'get':
            endpoint = idEjercicio
                ? `${baseUrlEjercicio}/${idEjercicio}/numeradores/${id}`
                : `${baseUrlGlobal}/${id}`;
            break;
        case 'create':
            endpoint = baseUrlGlobal;
            method = 'POST';
            break;
        case 'update':
            endpoint = baseUrlGlobal;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = baseUrlGlobal;
            method = 'DELETE';
            qs.idNumerador = id;
            break;
        case 'getByPrefixType':
            endpoint = '/phy2service/api/siges/numeradores-prefijos';
            break;
        case 'getOrigin':
            endpoint = '/phy2service/api/siges/numeradores-origen';
            qs.idNumerador = id;
            break;
        case 'getLastNumberNoPrefix':
            endpoint = `/phy2service/api/siges/numeradores-sin-prefijo/${id}`;
            if (idEjercicio)
                qs.IdEjercicio = idEjercicio;
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