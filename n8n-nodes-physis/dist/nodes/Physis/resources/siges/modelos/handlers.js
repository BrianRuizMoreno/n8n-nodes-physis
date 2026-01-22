"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/modelos';
    let endpoint = baseUrl;
    const method = 'GET';
    let qs = {};
    switch (operation) {
        case 'getAll':
            const idPpal = this.getNodeParameter('idPpal', index, 0);
            const idTipo = this.getNodeParameter('idTipoComprobante', index, '');
            if (idPpal)
                qs.IdPpal = idPpal;
            if (idTipo)
                qs.IdTipoComprobante = idTipo;
            break;
        case 'get':
            const id = this.getNodeParameter('idModelo', index);
            endpoint = `${baseUrl}/${id}`;
            qs.IdPpal = this.getNodeParameter('idPpal', index);
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