"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/sifac';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getListas':
            endpoint = `${baseUrl}/listas-precios`;
            break;
        case 'getProductosLista':
            endpoint = `${baseUrl}/listas-precios/${id}/productos`;
            break;
        case 'getPreciosProducto':
            endpoint = `${baseUrl}/productos/${id}/precios`;
            break;
        case 'getPrecioProductoEnLista': {
            const idLista = this.getNodeParameter('idLista', index);
            if (!idLista) {
                throw new Error('El parámetro "idLista" es requerido para esta operación.');
            }
            endpoint = `${baseUrl}/productos/${id}/precios/${idLista}`;
            break;
        }
        case 'getPreciosExistencia':
            endpoint = `${baseUrl}/productos/precios-existencia`;
            break;
        case 'upsertListaPrecios':
            endpoint = `${baseUrl}/productos/${id}/lista-precios`;
            method = 'POST';
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