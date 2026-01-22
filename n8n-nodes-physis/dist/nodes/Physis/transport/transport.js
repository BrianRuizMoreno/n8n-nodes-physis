"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysisTransport = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class PhysisTransport {
    constructor(functions) {
        this.functions = functions;
    }
    async request(method, endpoint, body = {}, qs = {}) {
        const credentials = await this.functions.getCredentials('physisApi');
        let baseUrl = credentials.baseUrl;
        if (baseUrl.endsWith('/'))
            baseUrl = baseUrl.slice(0, -1);
        if (!endpoint.startsWith('/'))
            endpoint = `/${endpoint}`;
        const options = {
            method,
            uri: `${baseUrl}${endpoint}`,
            body,
            qs,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${credentials.token}`,
            },
        };
        try {
            return await this.functions.helpers.request(options);
        }
        catch (error) {
            throw new n8n_workflow_1.NodeApiError(this.functions.getNode(), error);
        }
    }
    async getAll(endpoint, qs = {}) {
        return this.request('GET', endpoint, {}, qs);
    }
}
exports.PhysisTransport = PhysisTransport;
//# sourceMappingURL=transport.js.map