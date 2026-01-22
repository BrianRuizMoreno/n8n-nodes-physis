"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medioTransporteFields = exports.medioTransporteOperations = void 0;
exports.medioTransporteOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['medioTransporte'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Todos los medios', action: 'Listar todos a medio transporte', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Medio específico', action: 'Obtener por ID a medio transporte', },
            { name: 'Listar Por Transportista', value: 'getByTransportista', description: 'GET Medios de un transportista', action: 'Listar por transportista a medio transporte', },
            { name: 'Crear', value: 'create', description: 'POST Nuevo medio', action: 'Crear a medio transporte', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modificar medio', action: 'Actualizar a medio transporte', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Eliminar medio', action: 'Eliminar a medio transporte', },
        ],
        default: 'getAll',
    },
];
exports.medioTransporteFields = [
    {
        displayName: 'ID Medio / Transportista',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: { service: ['sifac'], resource: ['medioTransporte'], operation: ['get', 'update', 'delete', 'getByTransportista'] }
        },
        description: 'ID del Medio de Transporte o ID del Transportista (para listar sus medios)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['medioTransporte'] } },
    },
];
//# sourceMappingURL=description.js.map