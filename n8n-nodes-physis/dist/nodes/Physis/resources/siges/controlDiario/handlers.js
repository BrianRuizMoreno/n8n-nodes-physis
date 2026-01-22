"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const n8n_workflow_1 = require("n8n-workflow");
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/informe-control-diario-billetera';
    const endpoint = baseUrl;
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'uploadFile':
            method = 'POST';
            const binaryPropertyName = this.getNodeParameter('binaryPropertyName', index);
            const items = this.getInputData();
            const item = items[index];
            if (!item.binary || !item.binary[binaryPropertyName]) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), {}, { message: `No se encontraron datos binarios en la propiedad "${binaryPropertyName}".` });
            }
            const binaryData = item.binary[binaryPropertyName];
            const buffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
            let fileName = this.getNodeParameter('fileName', index, '');
            if (!fileName) {
                fileName = binaryData.fileName || 'archivo_conciliacion.txt';
            }
            body = {
                archivo: {
                    value: buffer,
                    options: {
                        filename: fileName,
                        contentType: binaryData.mimeType || 'application/octet-stream',
                    },
                },
            };
            qs = {
                nombre: fileName
            };
            break;
        case 'getReport':
            qs = {
                filePath: this.getNodeParameter('filePath', index)
            };
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST') {
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