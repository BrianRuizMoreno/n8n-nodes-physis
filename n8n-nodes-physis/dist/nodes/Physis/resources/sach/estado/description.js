"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estadoFields = exports.estadoOperations = void 0;
exports.estadoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['estado'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los estados', action: 'Listar todos an estado', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un estado específico', action: 'Obtener por ID an estado', },
            { name: 'Consulta Avanzada', value: 'search', description: 'POST Búsqueda con filtros y paginado', action: 'Consulta avanzada an estado', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo estado', action: 'Crear an estado', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un estado existente', action: 'Actualizar an estado', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un estado', action: 'Eliminar an estado', },
        ],
        default: 'getAll',
    },
];
exports.estadoFields = [
    {
        displayName: 'ID Estado',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['estado'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador numérico del estado',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['estado'],
                operation: ['create', 'update', 'search']
            }
        },
        description: 'Cuerpo para Crear/Actualizar (idEstado, descripcion, porDefecto) o Filtros para Consulta Avanzada',
    },
];
//# sourceMappingURL=description.js.map