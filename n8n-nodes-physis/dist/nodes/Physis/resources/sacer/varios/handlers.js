"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const resource = this.getNodeParameter('resource', index);
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    const body = {};
    switch (resource) {
        case 'liquidacion':
            if (operation === 'getPdf') {
                const idEjercicio = this.getNodeParameter('idEjercicio', index, '');
                const idComprobante = this.getNodeParameter('idComprobante', index, '');
                endpoint = `/phy2service/api/sacer/ejercicios/${idEjercicio}/liquidaciones/${idComprobante}/pdf`;
            }
            break;
        case 'localidad':
            if (operation === 'getAll') {
                endpoint = '/phy2service/api/sacer/localidades';
            }
            break;
        case 'lote': {
            if (operation === 'get') {
                const codLote = this.getNodeParameter('id', index, '');
                endpoint = `/phy2service/api/sacer/lotes/${codLote}`;
            }
            else if (operation === 'getByTercero') {
                const idAuxi = this.getNodeParameter('idAuxi', index, '');
                const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index, '');
                endpoint = `/phy2service/api/sacer/lotes/${idAuxi}/${idCtaAuxi}`;
            }
            break;
        }
        case 'muestra': {
            if (operation === 'get') {
                const idCartaPorte = this.getNodeParameter('idCartaPorte', index, '');
                const nroMuestra = this.getNodeParameter('nroMuestra', index, '');
                endpoint = `/phy2service/api/sacer/muestras/${idCartaPorte}/${nroMuestra}`;
            }
            else if (operation === 'getAll') {
                endpoint = '/phy2service/api/sacer/muestras';
            }
            break;
        }
        case 'sucursal':
            if (operation === 'getAll') {
                endpoint = '/phy2service/api/sacer/sucursales';
            }
            break;
        case 'tipoTercero':
            if (operation === 'getTercero') {
                endpoint = '/phy2service/api/sacer/tipos-tercero';
            }
            break;
        default:
            throw new Error(`El recurso SACER "${resource}" no está manejado en varios/handlers.ts`);
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
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map