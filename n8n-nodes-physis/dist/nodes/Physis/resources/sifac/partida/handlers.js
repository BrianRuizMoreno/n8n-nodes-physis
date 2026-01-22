"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getByProducto':
            endpoint = `${endpoint}/productos/${id}/partidas`;
            break;
        case 'getAll':
            endpoint = `${endpoint}/partidas`;
            break;
        case 'create':
            endpoint = `${endpoint}/partidas`;
            method = 'POST';
            break;
        case 'update':
            endpoint = `${endpoint}/partidas`;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = `${endpoint}/partidas/${id}`;
            method = 'DELETE';
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
                const queryKeys = [
                    'ingresoTropa',
                    'datosTropa',
                    'validoUso',
                    'vencimientoTropa',
                    'agregarRelacionPartidaProducto',
                    'idPlanProducto',
                    'idProducto',
                    'porComprobante',
                    'conParametrica',
                    'parametricaAnterior',
                    'crearAuxiliar'
                ];
                for (const key of queryKeys) {
                    if (key in body) {
                        qs[key] = body[key];
                        delete body[key];
                    }
                }
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