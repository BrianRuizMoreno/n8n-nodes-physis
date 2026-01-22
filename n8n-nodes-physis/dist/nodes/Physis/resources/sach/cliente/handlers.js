"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/clientes';
    const method = 'GET';
    const body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'get':
            endpoint = `${endpoint}/${id}`;
            break;
        case 'getPendientesEmision':
            endpoint = `${endpoint}/pendientesdeemision`;
            break;
        case 'getSubcuentas':
            endpoint = `${endpoint}/subcuentas`;
            break;
        case 'getCategoriasRfocb':
            endpoint = `${endpoint}/categorias-rfocb`;
            break;
        case 'getAllCategoriasRfocb':
            endpoint = `${endpoint}/categorias-rfocb/all`;
            break;
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            qs = { ...qs, ...json };
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