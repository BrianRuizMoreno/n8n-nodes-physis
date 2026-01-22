"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plazoFields = exports.plazoOperations = void 0;
exports.plazoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['plazo'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los plazos', action: 'Listar todos a plazo', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un plazo específico', action: 'Obtener por ID a plazo', },
            { name: 'Consulta Avanzada', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros, orden y paginado (vía JSON)', action: 'Consulta avanzada a plazo', },
            { name: 'Listar Por Cliente/Lugar', value: 'getByCliente', description: 'GET Lista plazos permitidos para un cliente/operación', action: 'Listar por cliente lugar a plazo', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo plazo', action: 'Crear a plazo', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un plazo existente', action: 'Actualizar a plazo', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un plazo', action: 'Eliminar a plazo', },
        ],
        default: 'getAll',
    },
];
exports.plazoFields = [
    {
        displayName: 'ID Plazo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['plazo'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador numérico del plazo',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['plazo']
            }
        },
        description: 'Cuerpo para Create/Update, Filtro complejo para SearchV2, o parámetros Query String para getByCliente (IdLugar, IdCtaAuxi, etc.)',
    },
];
//# sourceMappingURL=description.js.map