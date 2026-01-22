"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/silab';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAllTipos':
            endpoint = `${baseUrl}/tipos`;
            break;
        case 'getTipo':
            endpoint = `${baseUrl}/tipos/${id}`;
            break;
        case 'createTipo':
            endpoint = `${baseUrl}/tipos`;
            method = 'POST';
            break;
        case 'updateTipo':
            endpoint = `${baseUrl}/tipos`;
            method = 'PUT';
            break;
        case 'deleteTipo':
            endpoint = `${baseUrl}/tipos`;
            method = 'DELETE';
            break;
        case 'getAllTiposFormulario':
            endpoint = `${baseUrl}/tipos-formulario`;
            break;
        case 'getTipoFormulario':
            endpoint = `${baseUrl}/tipos-formulario/${id}`;
            break;
        case 'updateTipoFormulario':
            endpoint = `${baseUrl}/tipos-formulario`;
            method = 'PUT';
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
    if (operation === 'deleteTipo' && id) {
        qs.sigla = id;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map