"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marcaFields = exports.marcaOperations = void 0;
exports.marcaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['marca'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista marcas de un cliente específico', action: 'Listar marcas cliente a marca', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene una marca específica de un cliente', action: 'Obtener por ID a marca', },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva marca', action: 'Crear a marca', },
            { name: 'Actualizar', value: 'update', description: 'PUT Actualiza una marca existente', action: 'Actualizar a marca', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una marca (Parámetros en JSON Body)', action: 'Eliminar a marca', },
        ],
        default: 'getAll',
    },
];
exports.marcaFields = [
    {
        displayName: 'ID Marca',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['marca'],
                operation: ['get']
            }
        },
        description: 'Identificador numérico de la marca',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['marca']
            }
        },
        description: 'Cuerpo para Crear/Actualizar. Para Listar/Eliminar/Obtener: {"IdAuxi": 0, "IdCtaAuxi": "...", "IdMarca": 0}.',
    },
];
//# sourceMappingURL=description.js.map