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
        case 'getAll':
            endpoint = '/phy2service/api/sach/lotes';
            break;
        case 'getAllGrid':
            endpoint = '/phy2service/api/sach/v2/lotes';
            break;
        case 'get':
            endpoint = `/phy2service/api/sach/lotes/${id}`;
            break;
        case 'upsert':
            endpoint = '/phy2service/api/sach/lotes';
            method = 'POST';
            break;
        case 'delete':
            endpoint = '/phy2service/api/sach/lotes';
            method = 'DELETE';
            break;
        case 'getByCarga':
            endpoint = `/phy2service/api/sach/lotesbycarga/${id}`;
            break;
        case 'upsertByCarga':
            endpoint = '/phy2service/api/sach/lotesbycarga';
            method = 'POST';
            break;
        case 'deleteByCarga':
            endpoint = '/phy2service/api/sach/lotesbycarga';
            method = 'DELETE';
            break;
        case 'getProximo':
            endpoint = `/phy2service/api/sach/lotes/proximo/${id}`;
            break;
        case 'getPuestos':
            endpoint = '/phy2service/api/sach/lotes/puestosdecarga';
            break;
        case 'getFormasCobro':
            endpoint = '/phy2service/api/sach/lotes/formasdecobro';
            break;
        case 'getExisteBoleto':
            endpoint = '/phy2service/api/sach/lotes/existeboleto';
            break;
        case 'getPendientes':
            endpoint = '/phy2service/api/sach/lotes/pendientesdeemision';
            break;
        case 'getTipoComprobante':
            endpoint = '/phy2service/api/sach/lotes/tipo-comprobante';
            break;
        case 'getPrefijos':
            endpoint = '/phy2service/api/sach/lotes/prefijos';
            break;
        case 'getGastoComisionTotal':
            endpoint = '/phy2service/api/sach/lotes/gasto-comision-total';
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