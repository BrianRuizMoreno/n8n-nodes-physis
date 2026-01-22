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
        case 'getAll':
            const useAllEndpoint = this.getNodeParameter('useAllEndpoint', index, false);
            if (useAllEndpoint) {
                endpoint = `${baseUrl}/tipos-comprobante/all`;
            }
            else {
                endpoint = `${baseUrl}/tipos-comprobante`;
                const idModelo = this.getNodeParameter('idModelo', index, 0);
                const fechaVigencia = this.getNodeParameter('fechaVigencia', index, '');
                if (idModelo !== 0)
                    qs.idModelo = idModelo;
                if (fechaVigencia)
                    qs.fechaVigencia = fechaVigencia;
            }
            break;
        case 'get':
            const id = this.getNodeParameter('idTipoComprobante', index);
            endpoint = `${baseUrl}/tipos-comprobante/${id}`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/tipos-comprobante`;
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/tipos-comprobante`;
            break;
        case 'delete':
            method = 'DELETE';
            const idDel = this.getNodeParameter('idTipoComprobante', index);
            endpoint = `${baseUrl}/tipos-comprobante/${idDel}`;
            break;
        case 'getNumerators':
            const idNum = this.getNodeParameter('idTipoComprobante', index);
            endpoint = `${baseUrl}/tipos-comprobante/${idNum}/numeradores`;
            break;
        case 'getByAffectation':
            endpoint = `${baseUrl}/tipos-comprobante-all-afectacion`;
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index),
                Afectacion: this.getNodeParameter('afectacion', index),
                FechaVigencia: this.getNodeParameter('fechaVigencia', index)
            };
            break;
        case 'getByIVA':
            endpoint = `${baseUrl}/tipos-comprobante-all-iva`;
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index),
                TipoIVA: this.getNodeParameter('tipoIva', index)
            };
            break;
        case 'getClasses':
            endpoint = `${baseUrl}/tipos-comprobante/clases`;
            qs = {
                Origen: this.getNodeParameter('origen', index),
                SubSistema: this.getNodeParameter('subSistema', index)
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