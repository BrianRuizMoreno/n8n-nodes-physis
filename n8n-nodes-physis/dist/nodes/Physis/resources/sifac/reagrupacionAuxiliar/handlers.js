"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const transport = new transport_1.PhysisTransport(this);
    const idAuxi = this.getNodeParameter('idAuxi', index);
    const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index);
    const endpoint = `/phy2service/api/sifac/reagrupaciones-auxiliares/${idAuxi}/${idCtaAuxi}/default`;
    const method = 'GET';
    const response = await transport.request(method, endpoint, {}, {});
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map