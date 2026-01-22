"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = '/phy2service/api/sacer/cartas-porte';
            break;
        case 'getGrid':
            endpoint = '/phy2service/api/sacer/v2/cartas-porte';
            const esAnulado = this.getNodeParameter('esAnulado', index, false);
            qs.esAnulado = esAnulado;
            break;
        case 'get':
            endpoint = `/phy2service/api/sacer/cartas-porte/${id}`;
            break;
        case 'create':
            endpoint = '/phy2service/api/sacer/cartas-porte';
            method = 'POST';
            break;
        case 'getPdf':
            endpoint = `/phy2service/api/sacer/cartas-porte/${id}/pdf`;
            break;
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (operation === 'create') {
                body = json;
                if (body.grabaSavec !== undefined) {
                    qs.grabaSavec = body.grabaSavec;
                    delete body.grabaSavec;
                }
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