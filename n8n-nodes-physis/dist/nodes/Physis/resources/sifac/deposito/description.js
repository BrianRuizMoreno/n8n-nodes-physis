"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositoFields = exports.depositoOperations = void 0;
exports.depositoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['deposito'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Buscar depósitos con filtros', action: 'Listar buscar a deposito', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Depósito específico', action: 'Obtener por ID a deposito', },
            { name: 'Crear', value: 'create', description: 'POST Nuevo depósito', action: 'Crear a deposito', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modificar depósito', action: 'Actualizar a deposito', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Eliminar depósito', action: 'Eliminar a deposito', },
        ],
        default: 'getAll',
    },
];
exports.depositoFields = [
    {
        displayName: 'ID Depósito',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['deposito'], operation: ['get', 'delete'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['deposito'] } },
        description: 'Filtros: criterio, conCampos, mostrarStock, etc. O Body para create/update.',
    },
];
//# sourceMappingURL=description.js.map