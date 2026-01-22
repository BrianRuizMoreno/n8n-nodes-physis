"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autorizacionFields = exports.autorizacionOperations = void 0;
exports.autorizacionOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['autorizacion'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los autorizantes del sistema', action: 'Listar autorizantes an autorizacion', },
            { name: 'Pases Pendientes', value: 'getPasesPendientes', description: 'GET Pases financieros pendientes', action: 'Pases pendientes an autorizacion', },
            { name: 'Actualizar Pase (Patch)', value: 'updatePase', description: 'PATCH Autorizar/Desautorizar pase', action: 'Actualizar pase patch an autorizacion', },
            { name: 'Actualizar Pase (Put)', value: 'updatePasePut', description: 'PUT Para afectar/desafectar', action: 'Actualizar pase put an autorizacion', },
            { name: 'Listar Pases Afectables', value: 'getAfectaciones', description: 'POST Lista pases disponibles para afectar', action: 'Listar pases afectables an autorizacion', },
            { name: 'Pases Ref. Sin Afectar', value: 'getSinAfectar', description: 'GET Pases referenciados pendientes', action: 'Pases ref sin afectar an autorizacion', },
        ],
        default: 'getAll',
    },
];
exports.autorizacionFields = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['autorizacion'] } },
    },
];
//# sourceMappingURL=description.js.map