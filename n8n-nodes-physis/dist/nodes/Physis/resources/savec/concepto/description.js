"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conceptoFields = exports.conceptoOperations = void 0;
exports.conceptoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['concepto'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista conceptos (permite filtro por clase)', action: 'Listar todos a concepto', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un concepto específico', action: 'Obtener por ID a concepto', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo concepto', action: 'Crear a concepto', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un concepto existente', action: 'Actualizar a concepto', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un concepto', action: 'Eliminar a concepto', },
        ],
        default: 'getAll',
    },
];
exports.conceptoFields = [
    {
        displayName: 'ID Concepto',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['concepto'],
                operation: ['get', 'delete']
            }
        },
        description: 'Código numérico del concepto (codConcepto)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['concepto']
            },
            hide: {
                operation: ['get', 'delete']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar.\n' +
            'Ej. Listar: { "clase": "%" }\n' +
            'Ej. Crear: { "descripcion": "Gasto X", "alicuota": 21 ... }',
    },
];
//# sourceMappingURL=description.js.map