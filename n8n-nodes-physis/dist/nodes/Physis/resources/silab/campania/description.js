"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaniaFields = exports.campaniaOperations = void 0;
exports.campaniaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['campania'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Lista de campañas. Filtro opcional: idUsuario.',
                action: 'Listar todas a campania',
            },
            {
                name: 'Obtener Por ID',
                value: 'get',
                description: 'GET Datos de una campaña específica (CodCampania)',
                action: 'Obtener por ID a campania',
            },
        ],
        default: 'getAll',
    },
];
exports.campaniaFields = [
    {
        displayName: 'ID Campaña',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['campania'],
                operation: ['get']
            }
        },
        description: 'Ingrese el CodCampania',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['campania'],
                operation: ['getAll']
            }
        },
        description: 'Parámetros opcionales. Ej: {"idUsuario": 123}.',
    },
];
//# sourceMappingURL=description.js.map