"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variosFields = exports.variosOperations = void 0;
exports.variosOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['varios'] } },
        options: [
            {
                name: 'Cereal: Obtener por ID',
                value: 'getCereal',
                description: 'GET Detalle de un cultivo (Cereal) por su código',
                action: 'Cereal obtener por id a varios',
            },
            {
                name: 'Intercambio: Consultar Mapeo',
                value: 'getCodigoIntercambio',
                description: 'GET Busca equivalencias en tablas de intercambio',
                action: 'Intercambio consultar mapeo a varios',
            },
        ],
        default: 'getCereal',
    },
];
exports.variosFields = [
    {
        displayName: 'ID Cereal',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['varios'],
                operation: ['getCereal']
            }
        },
        description: 'Código numérico del cereal/cultivo',
    },
    {
        displayName: 'JSON Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['varios'],
                operation: ['getCodigoIntercambio']
            }
        },
        description: 'Parámetros de búsqueda. Ej: { "Tabla": "Lotes", "CodigoIntercambio": "EXT-101" }.',
    },
];
//# sourceMappingURL=description.js.map