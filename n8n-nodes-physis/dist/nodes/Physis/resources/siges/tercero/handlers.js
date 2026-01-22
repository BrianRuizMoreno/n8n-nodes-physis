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
    switch (operation) {
        case 'search':
            endpoint = `${baseUrl}/terceros`;
            const texto = this.getNodeParameter('texto', index, '');
            const idAuxiFilter = this.getNodeParameter('idAuxiFilter', index, 0);
            if (texto)
                qs.texto = texto;
            if (idAuxiFilter)
                qs.idAuxi = idAuxiFilter;
            break;
        case 'get':
            const idAuxiGet = this.getNodeParameter('idAuxi', index);
            const idCtaAuxiGet = this.getNodeParameter('idCtaAuxi', index);
            endpoint = `${baseUrl}/terceros/${idAuxiGet}/${idCtaAuxiGet}`;
            break;
        case 'getByDocument':
            endpoint = `${baseUrl}/terceros-nrodoc`;
            qs.NroDoc = this.getNodeParameter('nroDoc', index);
            break;
        case 'query':
            method = 'POST';
            endpoint = `${baseUrl}/terceros/consulta`;
            break;
        case 'getAddresses':
            const idAuxiAddr = this.getNodeParameter('idAuxi', index);
            const idCtaAuxiAddr = this.getNodeParameter('idCtaAuxi', index);
            endpoint = `${baseUrl}/terceros/${idAuxiAddr}/${idCtaAuxiAddr}/domicilios`;
            break;
        case 'createAddress':
            method = 'POST';
            const idAuxiCreate = this.getNodeParameter('idAuxi', index);
            const idCtaAuxiCreate = this.getNodeParameter('idCtaAuxi', index);
            endpoint = `${baseUrl}/terceros/${idAuxiCreate}/${idCtaAuxiCreate}/domicilios`;
            body.idAuxi = idAuxiCreate;
            body.idCtaAuxi = idCtaAuxiCreate;
            break;
        case 'getBankAccounts':
            endpoint = `${baseUrl}/terceroscuentasbancarias`;
            break;
        case 'getContacts':
            endpoint = `${baseUrl}/terceros/contactosreagrupados`;
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