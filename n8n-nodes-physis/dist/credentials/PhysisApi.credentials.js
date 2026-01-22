"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysisApi = void 0;
class PhysisApi {
    constructor() {
        this.name = 'physisApi';
        this.displayName = 'Physis API';
        this.documentationUrl = 'https://dev.physis.com.ar';
        this.properties = [
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: '',
                placeholder: 'https://tu-servidor.physis.com.ar',
                description: 'URL base de la API (sin barra final)',
            },
            {
                displayName: 'Token',
                name: 'token',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'Bearer token para Authorization',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.token}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '/phy2web/auth',
            },
        };
    }
}
exports.PhysisApi = PhysisApi;
//# sourceMappingURL=PhysisApi.credentials.js.map