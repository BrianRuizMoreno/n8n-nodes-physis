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
        case 'getAllAgro':
            endpoint = '/phy2service/api/sach/establecimientos-agropecuarios';
            break;
        case 'getAgro':
            endpoint = `/phy2service/api/sach/establecimientos-agropecuarios/${id}`;
            break;
        case 'createAgro':
            endpoint = '/phy2service/api/sach/establecimientos-agropecuarios';
            method = 'POST';
            break;
        case 'updateAgro':
            endpoint = '/phy2service/api/sach/establecimientos-agropecuarios';
            method = 'PUT';
            break;
        case 'getAgroByCliente':
            endpoint = '/phy2service/api/sach/clientes/establecimientos-agropecuarios';
            break;
        case 'getRenspaAgroByCliente':
            endpoint = '/phy2service/api/sach/clientes/renspa-establecimientos-agropecuarios';
            break;
        case 'getAllFaenador':
            endpoint = '/phy2service/api/sach/establecimientos-faenadores';
            break;
        case 'getFaenador':
            endpoint = `/phy2service/api/sach/establecimientos-faenadores/${id}`;
            break;
        case 'createFaenador':
            endpoint = '/phy2service/api/sach/establecimientos-faenadores';
            method = 'POST';
            break;
        case 'updateFaenador':
            endpoint = '/phy2service/api/sach/establecimientos-faenadores';
            method = 'PUT';
            break;
        case 'getFaenadorByCliente':
            endpoint = '/phy2service/api/sach/clientes/establecimientos-faenadores';
            break;
        case 'getOnccaFaenadorByCliente':
            endpoint = '/phy2service/api/sach/clientes/onca-establecimientos-faenadores';
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