"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/firmas';
    let endpoint = '';
    let method = 'GET';
    let body = {};
    let qs = {};
    switch (operation) {
        case 'get':
            const codFirma = this.getNodeParameter('codFirma', index);
            endpoint = `${baseUrl}/${codFirma}`;
            qs = {
                incluirArchivos: this.getNodeParameter('incluirArchivos', index)
            };
            break;
        case 'create':
            method = 'POST';
            endpoint = baseUrl;
            const nombre = this.getNodeParameter('nombreFirmante', index, '');
            const apellido = this.getNodeParameter('apellidoFirmante', index, '');
            body = {
                FechaFirma: new Date().toISOString()
            };
            if (nombre)
                body.NombreFirmante = nombre;
            if (apellido)
                body.ApellidoFirmante = apellido;
            const items = this.getInputData();
            const item = items[index];
            const addAttachment = async (formField, binaryProp, defaultName) => {
                if (item.binary && item.binary[binaryProp]) {
                    const binaryData = item.binary[binaryProp];
                    const buffer = await this.helpers.getBinaryDataBuffer(index, binaryProp);
                    body[formField] = {
                        value: buffer,
                        options: {
                            filename: binaryData.fileName || defaultName,
                            contentType: binaryData.mimeType || 'image/png',
                        },
                    };
                }
            };
            const propFirma = this.getNodeParameter('binaryPropertyFirma', index);
            if (!item.binary || !item.binary[propFirma]) {
            }
            else {
                await addAttachment('imagen', propFirma, 'firma.png');
            }
            const propImg2 = this.getNodeParameter('binaryPropertyImg2', index, '');
            if (propImg2)
                await addAttachment('imagen2', propImg2, 'dni_frente.jpg');
            const propImg3 = this.getNodeParameter('binaryPropertyImg3', index, '');
            if (propImg3)
                await addAttachment('imagen3', propImg3, 'dni_dorso.jpg');
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