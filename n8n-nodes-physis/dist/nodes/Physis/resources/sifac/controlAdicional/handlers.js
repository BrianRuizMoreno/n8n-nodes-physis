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
        case 'getAll':
            endpoint += '/controles-adicionales';
            break;
        case 'get':
            endpoint += `/controles-adicionales/${id}`;
            break;
        case 'create':
            endpoint += '/controles-adicionales';
            method = 'POST';
            break;
        case 'update':
            endpoint += `/controles-adicionales/${id}`;
            method = 'PUT';
            break;
        case 'delete':
            endpoint += `/controles-adicionales/${id}`;
            method = 'DELETE';
            break;
        case 'getConductorAll':
            endpoint += '/conductores/controles-adicionales';
            break;
        case 'getConductor':
            endpoint += `/conductores/${id}/controles-adicionales`;
            break;
        case 'assignConductor':
            endpoint += `/conductores/${id}/controles-adicionales`;
            method = 'POST';
            break;
        case 'updateConductor':
            endpoint += `/conductores/${id}/controles-adicionales`;
            method = 'PUT';
            break;
        case 'clearConductor':
            endpoint += `/conductores/${id}/controles-adicionales`;
            method = 'DELETE';
            break;
        case 'removeConductorControl': {
            const idCtrlC = this.getNodeParameter('idControlAdicional', index);
            endpoint += `/conductores/${id}/controles-adicionales/${idCtrlC}`;
            method = 'DELETE';
            break;
        }
        case 'getMedioAll':
            endpoint += '/medios-transporte/controles-adicionales';
            break;
        case 'getMedio':
            endpoint += `/medios-transporte/${id}/controles-adicionales`;
            break;
        case 'assignMedio':
            endpoint += `/medios-transporte/${id}/controles-adicionales`;
            method = 'POST';
            break;
        case 'updateMedio':
            endpoint += `/medios-transporte/${id}/controles-adicionales`;
            method = 'PUT';
            break;
        case 'clearMedio':
            endpoint += `/medios-transporte/${id}/controles-adicionales`;
            method = 'DELETE';
            break;
        case 'removeMedioControl': {
            const idCtrlM = this.getNodeParameter('idControlAdicional', index);
            endpoint += `/medios-transporte/${id}/controles-adicionales/${idCtrlM}`;
            method = 'DELETE';
            break;
        }
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