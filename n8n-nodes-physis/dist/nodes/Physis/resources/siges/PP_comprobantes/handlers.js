"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/proveedores/comprobantes';
    let method = 'GET';
    let body = {};
    let qs = {};
    let id = '';
    try {
        id = this.getNodeParameter('id', index);
    }
    catch (e) { }
    try {
        const json = JSON.parse(this.getNodeParameter('jsonBody', index));
        if (['create', 'patch', 'addMessage', 'tableSearchEstados', 'uploadPdf', 'uploadFiles'].includes(operation)) {
            body = json;
        }
        else {
            qs = json;
        }
    }
    catch (e) { }
    if (operation === 'getAll') {
    }
    else if (operation === 'getMe') {
        endpoint = '/phy2service/api/siges/me/proveedores/comprobantes';
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'patch') {
        endpoint = `${endpoint}/${id}`;
        method = 'PATCH';
    }
    else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getEstados') {
        endpoint = '/phy2service/api/siges/proveedores/comprobantes/estados';
    }
    else if (operation === 'getPosiblesEstados') {
        endpoint = `${endpoint}/${id}/me/posibles-estados`;
    }
    else if (operation === 'tableSearchEstados') {
        endpoint = `${endpoint}/${id}/estados/consulta`;
        method = 'POST';
    }
    else if (operation === 'getAutorizantes') {
        endpoint = `${endpoint}/${id}/autorizantes`;
    }
    else if (operation === 'getMessages') {
        endpoint = `${endpoint}/${id}/mensajes`;
    }
    else if (operation === 'addMessage') {
        endpoint = `${endpoint}/${id}/mensajes`;
        method = 'POST';
    }
    else if (operation === 'getPdf') {
        endpoint = `${endpoint}/pdf/${id}`;
    }
    else if (operation === 'getFiles') {
        endpoint = `${endpoint}/${id}/archivos`;
    }
    else if (operation === 'uploadPdf') {
        endpoint = '/phy2service/api/siges/proveedores/comprobantes/pdf';
        method = 'POST';
    }
    else if (operation === 'getModulos') {
        endpoint = '/phy2service/api/siges/proveedores/modulos';
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map