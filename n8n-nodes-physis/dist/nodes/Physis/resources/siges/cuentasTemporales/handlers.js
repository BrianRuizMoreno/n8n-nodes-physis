"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/cuentastemp';
    let endpoint = '';
    const method = 'GET';
    let qs = {};
    const body = {};
    const idConexion = this.getNodeParameter('idConexion', index, 0);
    switch (operation) {
        case 'clean':
            endpoint = `${baseUrl}/limpia`;
            qs = { IdConexion: idConexion };
            break;
        case 'insertPrincipal':
            endpoint = `${baseUrl}/ppal`;
            qs = {
                IdConexion: idConexion,
                Cuentas: this.getNodeParameter('cuentas', index)
            };
            break;
        case 'insertAuxiliary':
            endpoint = `${baseUrl}/auxi`;
            qs = {
                IdConexion: idConexion,
                IdAuxi: this.getNodeParameter('idAuxi', index),
                Cuentas: this.getNodeParameter('cuentas', index)
            };
            break;
        case 'insertAllAuxiliary':
            endpoint = `${baseUrl}/auxi-all`;
            qs = {
                IdConexion: idConexion,
                IdAuxi: this.getNodeParameter('idAuxi', index)
            };
            break;
        case 'insertRegroupingPrincipal':
            endpoint = `${baseUrl}/reagppal`;
            qs = {
                IdConexion: idConexion,
                IdReagPpal: this.getNodeParameter('idReagPpal', index),
                Cuentas: this.getNodeParameter('cuentas', index)
            };
            break;
        case 'insertRegroupingAuxiliary':
            endpoint = `${baseUrl}/reagauxi`;
            qs = {
                IdConexion: idConexion,
                IdAuxi: this.getNodeParameter('idAuxi', index),
                IdReagAuxi: this.getNodeParameter('idReagAuxi', index),
                Cuentas: this.getNodeParameter('cuentas', index)
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
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map