"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
const luxon_1 = require("luxon");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/vencimientos-reagrupados';
    const endpoint = baseUrl;
    const method = 'GET';
    let qs = {};
    switch (operation) {
        case 'getGroupedMaturities':
            const idAuxi = this.getNodeParameter('idAuxi', index);
            const idReagAuxi = this.getNodeParameter('idReagAuxi', index);
            const idCtaReagAuxi = this.getNodeParameter('idCtaReagAuxi', index, '');
            const fechaInput = this.getNodeParameter('fechaDesde', index);
            let fechaFormatted = fechaInput;
            if (fechaInput && fechaInput.includes('-')) {
                const dt = luxon_1.DateTime.fromISO(fechaInput);
                if (dt.isValid) {
                    fechaFormatted = dt.toFormat('yyyyMMdd');
                }
            }
            qs = {
                idAuxi,
                idReagAuxi,
                fechaDesde: fechaFormatted
            };
            if (idCtaReagAuxi) {
                qs.idCtaReagAuxi = idCtaReagAuxi;
            }
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