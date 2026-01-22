"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeracionFields = exports.numeracionOperations = void 0;
exports.numeracionOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['numeracion'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista numeradores (por ejercicio u origen)', action: 'Listar numeradores a numeracion', },
            { name: 'Obtener Detalle', value: 'get', description: 'GET Detalle y último número de un numerador', action: 'Obtener detalle a numeracion', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo numerador', action: 'Crear a numeracion', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un numerador existente', action: 'Actualizar a numeracion', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un numerador', action: 'Eliminar a numeracion', },
            { name: 'Listar Por Tipo Prefijo', value: 'getByPrefixType', description: 'GET Filtra numeradores con o sin prefijo', action: 'Listar por tipo prefijo a numeracion', },
            { name: 'Obtener Origen', value: 'getOrigin', description: 'GET Obtiene el origen de un numerador', action: 'Obtener origen a numeracion', },
            { name: 'Último Nro (Sin Prefijo)', value: 'getLastNumberNoPrefix', description: 'GET Último número para comprobantes sin prefijo', action: 'Ltimo nro sin prefijo a numeracion', },
        ],
        default: 'getAll',
    },
];
exports.numeracionFields = [
    {
        displayName: 'ID Numerador',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['numeracion'],
                operation: ['get', 'delete', 'getOrigin', 'getLastNumberNoPrefix']
            }
        },
        description: 'Identificador del numerador',
    },
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['numeracion'],
                operation: ['getAll', 'get', 'getLastNumberNoPrefix']
            }
        },
        description: 'Opcional. Si se especifica, filtra la búsqueda por este Ejercicio Contable.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['numeracion']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros (origen, prefijo)',
    },
];
//# sourceMappingURL=description.js.map