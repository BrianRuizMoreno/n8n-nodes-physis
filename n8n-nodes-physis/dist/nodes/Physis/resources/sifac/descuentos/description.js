"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descuentosClientesFields = exports.descuentosClientesOperations = void 0;
exports.descuentosClientesOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['descuentosClientes'] } },
        options: [
            {
                name: 'Listar Árbol',
                value: 'getArbol',
                description: 'GET Estructura jerárquica. Filtros JSON: { "imputables": true }.', action: 'Listar rbol a descuentos clientes',
            },
            {
                name: 'Obtener Por ID',
                value: 'get',
                description: 'GET Detalle de un descuento por su código', action: 'Obtener por ID a descuentos clientes',
            },
            {
                name: 'Obtener Por Alias',
                value: 'getByAlias',
                description: 'GET Detalle por Sigla/Alias. JSON: { "alias": "DTO10" }.', action: 'Obtener por alias a descuentos clientes',
            },
            {
                name: 'Crear',
                value: 'create',
                description: 'POST Crear descuento. Body JSON requerido.', action: 'Crear a descuentos clientes',
            },
            {
                name: 'Modificar',
                value: 'update',
                description: 'PUT Modificar descuento. Body JSON requerido.', action: 'Modificar a descuentos clientes',
            },
            {
                name: 'Eliminar',
                value: 'delete',
                description: 'DELETE Eliminar descuento por su ID', action: 'Eliminar a descuentos clientes',
            },
        ],
        default: 'getArbol',
    },
];
exports.descuentosClientesFields = [
    {
        displayName: 'ID Descuento',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['descuentosClientes'],
                operation: [
                    'get',
                    'delete'
                ]
            }
        },
        description: 'Identificador único del descuento (idCtaReagAuxi)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['descuentosClientes']
            }
        },
        description: 'Cuerpo para POST/PUT (Body) o Filtros para GET (Query String). Para "Obtener por Alias", incluya { "alias": "..." }.',
    },
];
//# sourceMappingURL=description.js.map