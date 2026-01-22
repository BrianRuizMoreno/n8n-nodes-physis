"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.libroFields = exports.libroOperations = void 0;
exports.libroOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['libro'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista libros contables', action: 'Listar libros a libro', },
            { name: 'Obtener Por ID', value: 'getById', description: 'GET Detalle de libro', action: 'Obtener por ID a libro', },
            { name: 'Obtener Por Fecha', value: 'getByDate', description: 'GET Libro por fecha', action: 'Obtener por fecha a libro', },
        ],
        default: 'getAll',
    },
];
exports.libroFields = [
    {
        displayName: 'ID Libro / Fecha',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['libro'], operation: ['getById', 'getByDate'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['libro'] } },
    },
];
//# sourceMappingURL=description.js.map