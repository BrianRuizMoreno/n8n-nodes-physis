"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposComprobanteFields = exports.tiposComprobanteOperations = void 0;
exports.tiposComprobanteOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['tiposComprobante'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Listado de tipos de comprobantes. Filtros JSON: { "idSubSistema": "V", "idClaseMovimiento": "ALTA" }.',
                action: 'Listar todos a tipos comprobante',
            },
            {
                name: 'Obtener Por ID',
                value: 'get',
                description: 'GET Detalle de un tipo específico (ej: FAC, REM, PED)',
                action: 'Obtener por ID a tipos comprobante',
            },
            {
                name: 'Obtener Default Cobranza',
                value: 'getDefaultCobranza',
                description: 'GET Obtiene el tipo de comprobante predeterminado para recibos de cobro',
                action: 'Obtener default cobranza a tipos comprobante',
            },
        ],
        default: 'getAll',
    },
];
exports.tiposComprobanteFields = [
    {
        displayName: 'ID Tipo Comprobante',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['tiposComprobante'],
                operation: ['get']
            }
        },
        description: 'Código del tipo de comprobante (ej: FAC, REC, OP)',
    },
    {
        displayName: 'JSON Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['tiposComprobante'],
                operation: ['getAll']
            }
        },
        description: 'Filtros de búsqueda (Query Params). Ej: { "idSubSistema": "V" }.',
    },
];
//# sourceMappingURL=description.js.map