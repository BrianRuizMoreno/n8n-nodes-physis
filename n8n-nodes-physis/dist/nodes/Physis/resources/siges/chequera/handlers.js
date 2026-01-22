"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/chequeras';
    let endpoint = baseUrl;
    let method = 'GET';
    let body = {};
    let qs = {};
    const idChequera = this.getNodeParameter('idChequera', index, '');
    const idBanco = this.getNodeParameter('idBanco', index, '');
    const idCuenta = this.getNodeParameter('idCuentasBancarias', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'get':
            endpoint = `${baseUrl}/${idChequera}/${idBanco}/${idCuenta}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            method = 'DELETE';
            break;
        case 'getNext':
            endpoint = '/phy2service/api/siges/chequeras-proximo-id';
            break;
        case 'getByFiltroElectronico':
            endpoint = '/phy2service/api/siges/chequeras-defecto-filtro-electronico';
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
    if (operation === 'delete') {
        if (idChequera)
            qs.idChequera = idChequera;
        if (idBanco)
            qs.idBanco = idBanco;
        if (idCuenta)
            qs.idCuentaCte = idCuenta;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map