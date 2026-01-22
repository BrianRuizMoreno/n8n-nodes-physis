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
    let qs = {};
    const idIndicador = this.getNodeParameter('idIndicador', index, '');
    const idSerie = this.getNodeParameter('idSerie', index, '');
    const tasa = this.getNodeParameter('tasa', index, '');
    switch (operation) {
        case 'getTasaDefault':
            endpoint = `${baseUrl}/tasa`;
            break;
        case 'getTasaSerie':
            endpoint = `${baseUrl}/indicadores/${idIndicador}/serie/${idSerie}`;
            break;
        case 'setTasa':
            endpoint = `${baseUrl}/indicadores/${idIndicador}/serie/${idSerie}/tasa/${tasa}`;
            method = 'POST';
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
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map