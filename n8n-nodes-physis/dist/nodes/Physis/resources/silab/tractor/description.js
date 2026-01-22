"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tractorFields = exports.tractorOperations = void 0;
exports.tractorOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['tractor'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve lista de Tractores', action: 'Obtener todos a tractor', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve datos de un Tractor', action: 'Obtener por ID a tractor', },
        ],
        default: 'getAll',
    },
];
exports.tractorFields = [
    {
        displayName: 'ID Tractor',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['silab'], resource: ['tractor'], operation: ['get'] } },
    },
];
//# sourceMappingURL=description.js.map