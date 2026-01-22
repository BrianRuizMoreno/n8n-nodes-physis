"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlBancarias = '/phy2service/api/siges/cuentas-corrientes-bancarias';
    const baseUrlGenerica = '/phy2service/api/siges/cuentas-corrientes';
    let endpoint = '';
    let method = 'GET';
    const body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = baseUrlBancarias;
            break;
        case 'get':
            endpoint = `${baseUrlBancarias}/${id}`;
            break;
        case 'insert':
            endpoint = `${baseUrlGenerica}/insert`;
            break;
        case 'update':
            endpoint = `${baseUrlGenerica}/update`;
            break;
        case 'delete':
            endpoint = baseUrlGenerica;
            method = 'DELETE';
            break;
        case 'getArbol':
            endpoint = `${baseUrlGenerica}/arbol`;
            break;
        case 'getMedios':
            endpoint = `${baseUrlBancarias}/medios`;
            break;
        case 'getMediosDesc':
            endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-medios';
            break;
        case 'getMediosPorBanco':
            endpoint = `/phy2service/api/siges/cuentas-corrientes-bancarias-medios/%IDBANCO%`;
            break;
        case 'getExportaOP':
            endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-ExportaOP';
            break;
        case 'getFiltroElectronico':
            endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-defecto-filtro-electronico';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (['insert', 'update'].includes(operation)) {
                qs.cuentaCte = JSON.stringify(json);
            }
            else {
                qs = { ...qs, ...json };
            }
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
    }
    if (operation === 'getMediosPorBanco') {
        const idBanco = qs.IdBanco || '';
        endpoint = endpoint.replace('%IDBANCO%', idBanco);
        if (qs.IdBanco)
            delete qs.IdBanco;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map