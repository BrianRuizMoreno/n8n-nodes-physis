"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.laborFields = exports.laborOperations = void 0;
exports.laborOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['labor'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Lista de labores. Opcional: formatoRespuesta.',
                action: 'Listar todas a labor',
            },
            {
                name: 'Obtener Por ID',
                value: 'get',
                description: 'GET Datos de una labor específica (IdLabor)',
                action: 'Obtener por ID a labor',
            },
            {
                name: 'Obtener Por Actividad',
                value: 'getByActividad',
                description: 'GET Labores asociadas a una actividad (IdActividad)',
                action: 'Obtener por actividad a labor',
            },
        ],
        default: 'getAll',
    },
];
exports.laborFields = [
    {
        displayName: 'ID Labor / Actividad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['labor'],
                operation: ['get', 'getByActividad']
            }
        },
        description: 'Ingrese el IdLabor (para "Obtener por ID") o el IdActividad (para "Obtener por Actividad")',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['labor'],
                operation: ['getAll']
            }
        },
        description: 'Parámetros opcionales. Ej: {"formatoRespuesta": "CSV"}.',
    },
];
//# sourceMappingURL=description.js.map