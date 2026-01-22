"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.motivoRetiroFields = exports.motivoRetiroOperations = void 0;
exports.motivoRetiroOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['motivoRetiro'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista motivos de retiro', action: 'Listar todos a motivo retiro', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un motivo específico', action: 'Obtener por ID a motivo retiro', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo motivo de retiro', action: 'Crear a motivo retiro', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un motivo existente', action: 'Actualizar a motivo retiro', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un motivo', action: 'Eliminar a motivo retiro', },
        ],
        default: 'getAll',
    },
];
exports.motivoRetiroFields = [
    {
        displayName: 'ID Motivo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['motivoRetiro'],
                operation: ['get', 'delete']
            }
        },
        description: 'Código numérico del motivo de retiro (codMotivo)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['motivoRetiro'],
                operation: ['create', 'update']
            }
        },
        description: 'Cuerpo para Crear/Actualizar. Ej: { "descripcion": "Venta Interna", "ventaInterna": true }.',
    },
];
//# sourceMappingURL=description.js.map