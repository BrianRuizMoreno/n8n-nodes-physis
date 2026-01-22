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
    const origen = this.getNodeParameter('origen', index, 0);
    switch (operation) {
        case 'listDashboards':
            endpoint = `${baseUrl}/tableros`;
            qs = { Origen: origen };
            break;
        case 'getDashboardData':
            endpoint = `${baseUrl}/tablero`;
            const fechaDesde = this.getNodeParameter('fechaDesde', index, '');
            const fechaHasta = this.getNodeParameter('fechaHasta', index, '');
            qs = {
                Origen: origen,
                IdGrupo: this.getNodeParameter('idGrupo', index),
                IdTablero: this.getNodeParameter('idTablero', index),
            };
            if (fechaDesde)
                qs.FechaDesde = fechaDesde;
            if (fechaHasta)
                qs.FechaHasta = fechaHasta;
            break;
        case 'createDashboard':
            endpoint = `${baseUrl}/tablero`;
            method = 'POST';
            body = { origen };
            break;
        case 'updateDashboard':
            endpoint = `${baseUrl}/tablero`;
            method = 'PUT';
            body = { origen };
            break;
        case 'getGridConfig':
            endpoint = `${baseUrl}/aggrid`;
            qs = {
                Origen: origen,
                Grilla: this.getNodeParameter('grillaName', index),
                IdUsuario: this.getNodeParameter('idUsuario', index, 0)
            };
            break;
        case 'updateGridConfig':
            endpoint = `${baseUrl}/aggrid`;
            method = 'PUT';
            body = {
                origen,
                grilla: this.getNodeParameter('grillaName', index)
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