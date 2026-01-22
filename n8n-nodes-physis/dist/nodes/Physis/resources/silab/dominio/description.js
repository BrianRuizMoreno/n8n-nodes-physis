"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dominioFields = exports.dominioOperations = void 0;
exports.dominioOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['dominio'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Devuelve todos los dominios configurados (máscaras y grupos de datos)',
                action: 'Listar todos a dominio',
            },
            {
                name: 'Obtener Por ID',
                value: 'get',
                description: 'GET Devuelve la configuración de un dominio específico (IDs 1 al 6)',
                action: 'Obtener por ID a dominio',
            },
        ],
        default: 'getAll',
    },
];
exports.dominioFields = [
    {
        displayName: 'ID Dominio',
        name: 'id',
        type: 'options',
        default: 1,
        required: true,
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['dominio'],
                operation: ['get']
            }
        },
        options: [
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
        ],
        description: 'Identificador del dominio a consultar',
    },
];
//# sourceMappingURL=description.js.map