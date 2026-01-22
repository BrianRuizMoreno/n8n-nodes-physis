"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlSifac = '/phy2service/api/sifac';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    const idAuxi = this.getNodeParameter('idAuxi', index, '');
    switch (operation) {
        case 'getConceptos':
            endpoint = `${baseUrlSifac}/conceptos`;
            break;
        case 'consultaTerceros':
            endpoint = `${baseUrlSifac}/consultas/terceros`;
            break;
        case 'getGrupoCuentas':
            if (!id || !idAuxi)
                throw new Error('Los campos "ID Grupo" e "ID Auxi" son obligatorios para esta operación.');
            endpoint = `${baseUrlSifac}/grupos/${id}/planes-de-cuentas-auxiliares/${idAuxi}/cuentas-auxiliares`;
            break;
        case 'updateGrupoCuentas':
            if (!id || !idAuxi)
                throw new Error('Los campos "ID Grupo" e "ID Auxi" son obligatorios para esta operación.');
            endpoint = `${baseUrlSifac}/grupos/${id}/planes-de-cuentas-auxiliares/${idAuxi}/cuentas-auxiliares`;
            method = 'POST';
            break;
        default:
            throw new Error(`La operación "${operation}" no está soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (operation === 'consultaTerceros') {
                if (Object.keys(json).length > 0) {
                    qs = {
                        consulta: JSON.stringify(json)
                    };
                }
            }
            else if (method === 'POST' || method === 'PUT') {
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