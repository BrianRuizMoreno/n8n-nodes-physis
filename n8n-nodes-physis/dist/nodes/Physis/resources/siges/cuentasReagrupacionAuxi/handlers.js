"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlConsultas = '/phy2service/api/siges/cuentas-reagrupacion-auxi';
    const baseUrlABM = '/phy2service/api/siges/cuentas-reagrupaciones-auxiliares';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = baseUrlConsultas;
            break;
        case 'get':
            endpoint = `${baseUrlConsultas}/${id}`;
            break;
        case 'getArbol':
            endpoint = `${baseUrlConsultas}/arbol`;
            break;
        case 'getTreeList':
            endpoint = `${baseUrlConsultas}/treelist`;
            break;
        case 'getNext':
            endpoint = `${baseUrlConsultas}/Next`;
            if (id)
                qs.sCuenta = id;
            break;
        case 'create':
            endpoint = baseUrlABM;
            method = 'POST';
            break;
        case 'update':
            endpoint = baseUrlABM;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = baseUrlABM;
            method = 'DELETE';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
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