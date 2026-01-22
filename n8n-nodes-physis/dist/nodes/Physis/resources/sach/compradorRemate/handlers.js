"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/compradoresremate';
    let method = 'GET';
    let body = {};
    let qs = {};
    const idPuestoCarga = this.getNodeParameter('idPuestoCarga', index, '');
    if (idPuestoCarga)
        qs.IdPuestoCarga = idPuestoCarga;
    const idRemateFeria = this.getNodeParameter('idRemateFeria', index, '');
    if (idRemateFeria)
        qs.IdRemateFeria = idRemateFeria;
    const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '');
    if (idCtaAuxi)
        qs.idCtaAuxi = idCtaAuxi;
    switch (operation) {
        case 'getAll':
            break;
        case 'create':
            method = 'POST';
            break;
        case 'delete':
            method = 'DELETE';
            break;
        case 'deleteAll':
            endpoint = '/phy2service/api/sach/compradoresremateall';
            method = 'DELETE';
            break;
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