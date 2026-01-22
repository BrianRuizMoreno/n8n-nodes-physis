"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ccInsumosFields = exports.ccInsumosOperations = void 0;
exports.ccInsumosOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['ccInsumos'] } },
        options: [
            {
                name: 'Pedidos: Resumen',
                value: 'getPedidosResumen',
                description: 'GET Lista resumen de pedidos. Filtros JSON: { "idAuxi": 1, "idCtaAuxi": "C01", "fechaDesde": "...", "sSubSistema": "V" }.', action: 'Pedidos resumen a cc insumos',
            },
            {
                name: 'Pedidos: Detalle y Cumplimiento',
                value: 'getPedidosDetalle',
                description: 'GET Lista detallada de pedidos con estado de entrega', action: 'Pedidos detalle y cumplimiento a cc insumos',
            },
            {
                name: 'Remitos: Resumen',
                value: 'getRemitosResumen',
                description: 'GET Lista resumen de remitos', action: 'Remitos resumen a cc insumos',
            },
            {
                name: 'Remitos: Detalle y Cumplimiento',
                value: 'getRemitosDetalle',
                description: 'GET Lista detallada de remitos con estado de facturación', action: 'Remitos detalle y cumplimiento a cc insumos',
            },
            {
                name: 'Facturas: Resumen',
                value: 'getFacturasResumen',
                description: 'GET Lista resumen de facturas', action: 'Facturas resumen a cc insumos',
            },
            {
                name: 'Facturas: Detalle',
                value: 'getFacturasDetalle',
                description: 'GET Lista detallada de facturas', action: 'Facturas detalle a cc insumos',
            },
            {
                name: 'Consultar Comprobante Único',
                value: 'getComprobanteCumplimiento',
                description: 'GET Detalle de cumplimientos de un comprobante específico (por ID Cabecera)', action: 'Consultar comprobante nico a cc insumos',
            },
        ],
        default: 'getPedidosResumen',
    },
];
exports.ccInsumosFields = [
    {
        displayName: 'ID Cabecera',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['ccInsumos'],
                operation: [
                    'getComprobanteCumplimiento'
                ]
            }
        },
        description: 'Identificador único del comprobante (idCabecera)',
    },
    {
        displayName: 'JSON Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['ccInsumos']
            },
            hide: {
                operation: ['getComprobanteCumplimiento']
            }
        },
        description: 'Filtros de búsqueda (Query String). Ej: {"idCtaAuxi": "CLI-01", "fechaDesde": "2026-01-01", "sSubSistema": "V"}.',
    },
];
//# sourceMappingURL=description.js.map