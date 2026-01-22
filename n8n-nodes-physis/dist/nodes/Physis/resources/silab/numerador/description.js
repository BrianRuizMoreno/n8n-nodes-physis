"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeradorFields = exports.numeradorOperations = void 0;
exports.numeradorOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['numerador'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Devuelve todos los numeradores disponibles',
                action: 'Listar todos a numerador',
            },
            {
                name: 'Listar Por Tipo (Prefijo)',
                value: 'getByPrefijo',
                description: 'GET Filtra numeradores según si usan prefijo (Punto de Venta) o no',
                action: 'Listar por tipo prefijo a numerador',
            },
        ],
        default: 'getAll',
    },
];
exports.numeradorFields = [
    {
        displayName: 'JSON Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['numerador'],
                operation: ['getByPrefijo']
            }
        },
        description: 'Filtros de búsqueda. Ej: { "prefijo": true } para numeradores con punto de venta, o { "prefijo": false } para internos.',
    },
];
//# sourceMappingURL=description.js.map