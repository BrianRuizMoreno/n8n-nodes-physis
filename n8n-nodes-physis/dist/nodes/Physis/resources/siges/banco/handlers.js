"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const transport_1 = require("../../../transport/transport");
async function execute(index) {
    const operation = this.getNodeParameter('operation', index);
    const transport = new transport_1.PhysisTransport(this);
    const baseUrl = '/phy2service/api/siges/bancos';
    let endpoint = baseUrl;
    let method = 'GET';
    let body = {};
    let qs = {};
    const id = this.getNodeParameter('id', index, '');
    switch (operation) {
        case 'getAll':
            break;
        case 'get':
            endpoint = `${baseUrl}/${id}`;
            break;
        case 'create':
            method = 'POST';
            break;
        case 'update':
            method = 'PUT';
            break;
        case 'delete':
            method = 'DELETE';
            break;
        case 'getArbol':
            endpoint = `${baseUrl}/arbol`;
            break;
        case 'getCCMedios':
            endpoint = `${baseUrl}/cuentas-corrientes-medios`;
            break;
        case 'getCCElectronicos':
            endpoint = `${baseUrl}/cuentas-corrientes-electronicos`;
            break;
        case 'getCaucion':
            endpoint = `${baseUrl}/cuentas-caucion`;
            break;
        case 'getConMedios':
            endpoint = `${baseUrl}/con-medios-o-electronicos`;
            break;
        case 'getExportaOP':
            endpoint = `${baseUrl}/cuentas-corrientes-exportaOP`;
            break;
        case 'getFormatos':
            endpoint = `${baseUrl}/valores-electronicos-formatos`;
            break;
        case 'getCodigosOperacion':
            endpoint = `${baseUrl}/codigos-operacion`;
            break;
        case 'getConFormatos':
            endpoint = `${baseUrl}/con-formatos-valores-electronicos`;
            break;
        case 'getCuentaTercero':
            endpoint = `${baseUrl}/CuentaBancariaTercero`;
            break;
        case 'createCuentaTercero':
            endpoint = `${baseUrl}/CuentaBancariaTercero`;
            method = 'POST';
            break;
        case 'updateCuentaTercero':
            endpoint = `${baseUrl}/CuentaBancariaTercero`;
            method = 'PUT';
            break;
        case 'deleteCuentaTercero':
            endpoint = `${baseUrl}/CuentaBancariaTercero`;
            method = 'DELETE';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }
    const rawJson = this.getNodeParameter('jsonBody', index, '');
    if (rawJson) {
        try {
            const json = JSON.parse(rawJson);
            if (method === 'POST' || method === 'PUT') {
                body = json;
            }
            else {
                qs = { ...qs, ...json };
            }
        }
        catch (error) {
            throw new Error(`JSON body inválido: ${error.message}`);
        }
    }
    if (operation === 'delete' && id) {
        qs.idBanco = id;
    }
    const response = await transport.request(method, endpoint, body, qs);
    const data = (response.Datos || response);
    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data }];
}
//# sourceMappingURL=handlers.js.map