"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = '/phy2service/api/silab/implementos';
            break;
        case 'getAllMaq':
            endpoint = '/phy2service/api/silab/maquinarias';
            break;
        case 'get':
        case 'getByName':
            endpoint = `/phy2service/api/silab/implementos/${id}`;
            break;
        case 'getMaqByName':
            endpoint = `/phy2service/api/silab/maquinarias/${id}`;
            break;
        case 'getByLabor':
            endpoint = `/phy2service/api/silab/labores/${id}/implementos`;
            break;
        case 'getMaqByLabor':
            endpoint = `/phy2service/api/silab/labores/${id}/maquinarias`;
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
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
    const response = await transport.request(method, endpoint, {}, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map