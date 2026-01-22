"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposFormularioFields = exports.tiposFormularioOperations = void 0;
exports.tiposFormularioOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['tiposFormulario'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista tipos de formulario', action: 'Listar todos a tipos formulario', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un tipo de formulario específico', action: 'Obtener por ID a tipos formulario', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de formulario', action: 'Crear a tipos formulario', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de formulario existente', action: 'Actualizar a tipos formulario', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de formulario', action: 'Eliminar a tipos formulario', },
        ],
        default: 'getAll',
    },
];
exports.tiposFormularioFields = [
    {
        displayName: 'ID Tipo Formulario',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['tiposFormulario'],
                operation: ['get', 'delete']
            }
        },
        description: 'Código identificador del tipo de formulario',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['tiposFormulario'],
                operation: ['create', 'update']
            }
        },
        description: 'Cuerpo para Crear/Actualizar. Ej: { "descripcion": "Orden Pago", "obligaIdAux": true }.',
    },
];
//# sourceMappingURL=description.js.map