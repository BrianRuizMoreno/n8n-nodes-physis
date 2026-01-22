"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gastoFields = exports.gastoOperations = void 0;
exports.gastoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['gasto'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los gastos configurados', action: 'Listar todos a gasto', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un gasto específico', action: 'Obtener por ID a gasto', },
            { name: 'Consulta Avanzada', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros, orden y paginado (vía JSON)', action: 'Consulta avanzada a gasto', },
            { name: 'Gastos Para Lote', value: 'getForLot', description: 'GET Lista gastos aplicables manualmente a un lote según contexto', action: 'Gastos para lote a gasto', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo gasto', action: 'Crear a gasto', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un gasto existente', action: 'Actualizar a gasto', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un gasto', action: 'Eliminar a gasto', },
        ],
        default: 'getAll',
    },
];
exports.gastoFields = [
    {
        displayName: 'ID Gasto',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['gasto'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador numérico del gasto',
    },
    {
        displayName: 'JSON Body / Parámetros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['gasto']
            }
        },
        description: 'Cuerpo para Create/Update, Filtro complejo para SearchV2, o parámetros Query String para "Gastos para Lote" (TipoCliente, idTipoOperacion, etc.)',
    },
];
//# sourceMappingURL=description.js.map