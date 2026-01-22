"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlCompradores = '/phy2service/api/siges/proveedores/compradores';
    const baseUrlAutorizantes = '/phy2service/api/siges/proveedores/autorizantes';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const idComprador = this.getNodeParameter('id', index, '');
    const idAutorizante = this.getNodeParameter('idAutorizante', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = baseUrlCompradores;
            break;
        case 'getSettings':
            endpoint = `${baseUrlCompradores}/settings`;
            break;
        case 'saveSettings':
            endpoint = `${baseUrlCompradores}/settings`;
            method = 'POST';
            break;
        case 'getAllAutorizantes':
            endpoint = baseUrlAutorizantes;
            break;
        case 'getAutorizantes':
            endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes`;
            break;
        case 'addAutorizante':
            endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes`;
            method = 'POST';
            break;
        case 'addAutorizanteList':
            endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes-list`;
            method = 'POST';
            break;
        case 'updateAutorizante':
            endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes}/${idAutorizante}`;
            method = 'PATCH';
            break;
        case 'deleteAutorizante':
            endpoint = `${baseUrlCompradores}/${idComprador}/autorizantes}/${idAutorizante}`;
            method = 'DELETE';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
                body = json;
            }
            else {
                if (!Array.isArray(json)) {
                    qs = { ...qs, ...json };
                }
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