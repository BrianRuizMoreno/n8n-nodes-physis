"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/reagrupacioncuentasrelaciondePrincipal';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'getDetail':
            endpoint = baseUrl;
            break;
        case 'getSelected':
            endpoint = `${baseUrl}-selec`;
            break;
        case 'getAvailable':
            endpoint = `${baseUrl}-disponible`;
            break;
        case 'getAvailableTree':
            endpoint = `${baseUrl}-disponible/arbol`;
            break;
        case 'create':
            endpoint = '/phy2service/api/siges/reagrupacioncuentasrelaciondePpal-ppales';
            method = 'POST';
            break;
        case 'createDirect':
            endpoint = '/phy2service/api/siges/reagrupaciones-ppales';
            method = 'POST';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST') {
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