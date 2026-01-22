"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            const idAuxiList = this.getNodeParameter('idAuxi', index, 0);
            if (idAuxiList > 0) {
                endpoint = `${baseUrl}/planes-cuentas-auxi/${idAuxiList}/reagrupaciones`;
            }
            else {
                endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
            }
            break;
        case 'get':
            endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
            qs = {
                idReagAuxi: id,
                idAuxi: this.getNodeParameter('idAuxi', index)
            };
            break;
        case 'getTotalSize':
            endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}/tamaniototal`;
            qs = { idAuxi: this.getNodeParameter('idAuxi', index) };
            break;
        case 'getAccounts':
            endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}/cuentas`;
            break;
        case 'getAssociatedAuxiliaries':
            const idCtaReag = this.getNodeParameter('idCtaReagAuxi', index);
            endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}/cuentas/${idCtaReag}/auxiliares`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/planes-reagrupacion-auxi`;
            break;
        case 'delete':
            method = 'DELETE';
            endpoint = `${baseUrl}/planes-reagrupacion-auxi/${id}`;
            qs = {
                idAuxi: this.getNodeParameter('idAuxi', index),
                idPpal: 1
            };
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT') {
                body = { ...body, ...json };
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