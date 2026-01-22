"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = `${baseUrl}/cuentas-auxi`;
            break;
        case 'get':
            endpoint = `${baseUrl}/cuentas-auxi/${id}`;
            break;
        case 'getByPlan':
            const idAuxi = this.getNodeParameter('idAuxi', index);
            endpoint = `${baseUrl}/planes-ctas-auxiliares/${idAuxi}/cuentas`;
            break;
        case 'getNextId':
            endpoint = `${baseUrl}/cuentas-auxi/siguiente`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/cuentas-auxi`;
            qs = {
                convenioMultilateral: this.getNodeParameter('convenioMultilateral', index, false),
                obligadoDirecto: this.getNodeParameter('obligadoDirecto', index, false)
            };
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/cuentas-auxi`;
            break;
        case 'delete':
            method = 'DELETE';
            endpoint = `${baseUrl}/cuentas-auxi`;
            break;
        case 'getTree':
            endpoint = `${baseUrl}/cuentas-auxiliares/arbol`;
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