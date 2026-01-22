"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrlImages = '/phy2service/api/siges/comprobantes/imagenes';
    let endpoint = '';
    let method = 'GET';
    const body = {};
    let qs = {};
    const idImagen = this.getNodeParameter('id', index, '');
    const idEjercicio = this.getNodeParameter('idEjercicio', index, '');
    const idComprobante = this.getNodeParameter('idComprobante', index, '');
    const idSecuencia = this.getNodeParameter('idSecuencia', index, '');
    switch (operation) {
        case 'getAll':
            endpoint = baseUrlImages;
            break;
        case 'get':
            endpoint = `${baseUrlImages}/${idImagen}`;
            break;
        case 'create':
            endpoint = baseUrlImages;
            method = 'POST';
            break;
        case 'update':
            endpoint = baseUrlImages;
            method = 'PUT';
            break;
        case 'delete':
            endpoint = baseUrlImages;
            method = 'DELETE';
            break;
        case 'getPdfComprobante':
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdf`;
            break;
        case 'getPdfAfip':
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdfAfip`;
            break;
        case 'getPdfOprc':
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdfOprc`;
            break;
        case 'getCertificadosList':
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/certificados`;
            break;
        case 'getPdfCertificado':
            endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/certificados/${idSecuencia}/pdf`;
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
    if (['getAll', 'get', 'create', 'update', 'delete'].includes(operation)) {
        if (idEjercicio)
            qs.IdEjercicio = idEjercicio;
        if (idComprobante)
            qs.IdComprobante = idComprobante;
        if ((operation === 'update' || operation === 'delete') && idImagen) {
            qs.IdImagen = idImagen;
        }
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map