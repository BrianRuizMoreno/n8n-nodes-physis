"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaFields = exports.empresaOperations = void 0;
exports.empresaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['empresa'] } },
        options: [
            { name: 'Empresa Actual', value: 'getCurrent', description: 'GET Datos de la empresa en contexto', action: 'Empresa actual an empresa', },
            { name: 'Nombre Actual', value: 'getCurrentName', description: 'GET Nombre de la empresa actual', action: 'Nombre actual an empresa', },
            { name: 'Aplicaciones', value: 'getApps', description: 'GET Apps habilitadas', action: 'Aplicaciones an empresa', },
            { name: 'Buscar Por CUIT', value: 'getByCuit', description: 'GET Busca empresa por CUIT', action: 'Buscar por CUIT an empresa', },
        ],
        default: 'getCurrent',
    },
];
exports.empresaFields = [
    {
        displayName: 'ID Empresa / CUIT',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['empresa'], operation: ['getByCuit'] } },
    },
];
//# sourceMappingURL=description.js.map