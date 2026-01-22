"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlPpal = '/phy2service/api/siges/cuentas-ppal';
    const baseUrlPrincipales = '/phy2service/api/siges/cuentas-principales';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = baseUrlPpal;
            break;
        case 'get':
            endpoint = `${baseUrlPpal}/${id}`;
            break;
        case 'create':
            endpoint = baseUrlPrincipales;
            method = 'POST';
            break;
        case 'update':
            endpoint = baseUrlPrincipales;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = baseUrlPrincipales;
            method = 'DELETE';
            break;
        case 'getArbol':
            endpoint = `${baseUrlPrincipales}/arbol`;
            break;
        case 'getTreeList':
            endpoint = `${baseUrlPrincipales}/treelist`;
            break;
        case 'getDepositos':
            endpoint = `${baseUrlPpal}-depositos`;
            break;
        case 'getAuxiliares':
            endpoint = `${baseUrlPrincipales}/cuentas-auxiliares`;
            break;
        case 'getByAuxi':
            endpoint = `${baseUrlPrincipales}/de-auxi/${id}`;
            break;
        case 'getReagrupacion':
            endpoint = `${baseUrlPrincipales}/cuentas-Reag/${id}`;
            break;
        case 'getNext':
            endpoint = `/phy2service/api/siges/cuentas-principales-siguiente/${id}`;
            break;
        case 'search':
            endpoint = `${baseUrlPpal}-buscar`;
            method = 'POST';
            break;
        case 'searchOPRC':
            endpoint = `${baseUrlPpal}-buscar-oprc`;
            method = 'POST';
            break;
        case 'searchValores':
            endpoint = `${baseUrlPpal}-buscar-valores`;
            method = 'POST';
            break;
        case 'searchRetenciones':
            endpoint = `${baseUrlPpal}-buscar-retenciones`;
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