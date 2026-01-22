"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retencionEspecialFields = exports.retencionEspecialOperations = void 0;
exports.retencionEspecialOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['retencionEspecial'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista retenciones especiales (filtros opcionales)', action: 'Listar todas a retencion especial', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene una retención específica', action: 'Obtener por ID a retencion especial', },
            { name: 'Crear', value: 'create', description: 'POST Inserta nueva retención especial', action: 'Crear a retencion especial', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una retención existente', action: 'Actualizar a retencion especial', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina retención (por ID o por Clave Compuesta)', action: 'Eliminar a retencion especial', },
            { name: 'Consulta Avanzada (Retenciones)', value: 'search', description: 'POST Búsqueda avanzada de retenciones', action: 'Consulta avanzada retenciones a retencion especial', },
            { name: 'Consulta Avanzada (Gastos)', value: 'searchGastos', description: 'POST Búsqueda avanzada de gastos asociados', action: 'Consulta avanzada gastos a retencion especial', },
            { name: 'Listar Por Cliente', value: 'getByCliente', description: 'GET Retenciones aplicables a un cliente', action: 'Listar por cliente a retencion especial', },
            { name: 'Listar Por Gasto', value: 'getByGasto', description: 'GET Retenciones filtradas por tipo de gasto', action: 'Listar por gasto a retencion especial', },
            { name: 'Listar Por Gasto Y Cliente', value: 'getByGastoCliente', description: 'GET Retenciones filtradas por gasto y rango de clientes', action: 'Listar por gasto y cliente a retencion especial', },
        ],
        default: 'getAll',
    },
];
exports.retencionEspecialFields = [
    {
        displayName: 'ID Retención',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['retencionEspecial'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador numérico de la retención',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['retencionEspecial']
            }
        },
        description: 'Cuerpo para Create/Update/Search o Filtros Query String (IdGasto, IdCtaAuxi, modo delete, etc.)',
    },
];
//# sourceMappingURL=description.js.map