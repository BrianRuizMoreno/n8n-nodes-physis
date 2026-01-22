"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoTasaFields = exports.tipoTasaOperations = void 0;
exports.tipoTasaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['tipoTasa'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista tipos de tasas', action: 'Listar todos a tipo tasa', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un tipo de tasa específico', action: 'Obtener por ID a tipo tasa', },
        ],
        default: 'getAll',
    },
];
exports.tipoTasaFields = [
    {
        displayName: 'ID Tipo Tasa',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['tipoTasa'], operation: ['get'] } },
        description: 'Identificador del tipo de tasa',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['tipoTasa'], operation: ['getAll'] } },
        description: 'Ej: { "idAuxi": 0, "idCtaAuxi": "..." }',
    },
];
//# sourceMappingURL=description.js.map