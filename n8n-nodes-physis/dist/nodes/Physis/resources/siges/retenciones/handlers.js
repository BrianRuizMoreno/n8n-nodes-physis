"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges';
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    switch (operation) {
        case 'getRegimes':
            endpoint = `${baseUrl}/regimen-retenciones`;
            qs.IdPpal = this.getNodeParameter('idPpal', index);
            const idCtaPpal = this.getNodeParameter('idCtaPpal', index, '');
            if (idCtaPpal) {
                qs.idCtaPpal = idCtaPpal;
            }
            break;
        case 'checkCertificateStatus':
            endpoint = `${baseUrl}/certificado-retenciones`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index),
                IdComprobante: this.getNodeParameter('idComprobante', index)
            };
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            qs = { ...qs, ...json };
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
    }
    const response = await transport.request(method, endpoint, {}, qs);
    let data = [];
    if (operation === 'checkCertificateStatus' && typeof response === 'boolean') {
        data = [{ estado: response }];
    }
    else {
        const resObj = response;
        data = (resObj.Datos || resObj);
    }
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map