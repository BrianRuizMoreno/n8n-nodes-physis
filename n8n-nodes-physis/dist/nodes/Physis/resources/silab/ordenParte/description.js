"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenParteFields = exports.ordenParteOperations = void 0;
exports.ordenParteOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['ordenParte'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista de órdenes con filtros opcionales', action: 'Listar filtros an orden parte', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de una orden específica', action: 'Obtener por ID an orden parte', },
            { name: 'Create or Update', value: 'upsert', description: 'Create a new record, or update the current one if it already exists (upsert)', action: 'Crear modificar an orden parte', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una orden', action: 'Eliminar an orden parte', },
            { name: 'Listar PUMA', value: 'getPuma', description: 'GET Listado de partes PUMA', action: 'Listar PUMA an orden parte', },
            { name: 'Listar Eliminados', value: 'getDeleted', description: 'GET Listado de partes eliminados', action: 'Listar eliminados an orden parte', },
            { name: 'Items De Estados', value: 'itemsEstados', description: 'POST Modificación masiva de estados de items', action: 'Items de estados an orden parte', },
            { name: 'Partes De Un Empleado', value: 'getByPersonal', description: 'GET Partes asociados a un personal (requiere ID Personal)', action: 'Partes de un empleado an orden parte', },
            { name: 'Items De Partes De Un Empleado', value: 'getByItems', description: 'GET Items de partes de un personal (requiere ID Personal)', action: 'Items de partes de un empleado an orden parte', },
        ],
        default: 'getAll',
    },
];
exports.ordenParteFields = [
    {
        displayName: 'ID Orden/Parte/Personal',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['ordenParte'],
                operation: ['get', 'delete', 'getByPersonal', 'getByItems']
            }
        },
        description: 'ID del recurso principal según la operación (Orden o Personal)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['ordenParte'],
                operation: ['getAll', 'upsert', 'delete', 'getPuma', 'getDeleted', 'itemsEstados']
            }
        },
        description: 'Cuerpo para POST (upsert) o Query Params para GET (filtros)',
    },
];
//# sourceMappingURL=description.js.map