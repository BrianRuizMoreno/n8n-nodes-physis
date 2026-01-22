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
    const body = {};
    let qs = {};
    const idAuxi = this.getNodeParameter('id', index, '');
    const idCtaAuxi = this.getNodeParameter('idCta', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = `${baseUrl}/creditos`;
            break;
        case 'getTiposBienes':
            endpoint = `${baseUrl}/tipobienes`;
            break;
        case 'upsert':
            endpoint = `${baseUrl}/creditos/insertupdate`;
            method = 'POST';
            break;
        case 'delete':
            endpoint = `${baseUrl}/creditos/delete`;
            method = 'POST';
            break;
        case 'getDisponible':
            endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}/credito-disponible`;
            break;
        case 'getDisponibleDetalle':
            endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}/%OPCION%/credito-disponible-detalle`;
            break;
        case 'getFormasCancelacion':
            endpoint = `${baseUrl}/terceros/Creditos-Forma-Cancelacion`;
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (operation === 'upsert') {
                qs.creditoJson = JSON.stringify(json);
            }
            else {
                qs = { ...qs, ...json };
            }
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
    }
    if (['getAll', 'delete'].includes(operation)) {
        if (idAuxi)
            qs.IdAuxi = idAuxi;
        if (idCtaAuxi)
            qs.IdCtaAuxi = idCtaAuxi;
    }
    if (operation === 'getDisponibleDetalle') {
        const opcion = qs.opcion || '0';
        endpoint = endpoint.replace('%OPCION%', opcion);
        if (qs.opcion)
            delete qs.opcion;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map