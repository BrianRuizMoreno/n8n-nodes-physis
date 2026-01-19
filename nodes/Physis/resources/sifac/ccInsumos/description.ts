import { INodeProperties } from 'n8n-workflow';

export const ccInsumosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['ccInsumos'] } },
        options: [
            // --- PEDIDOS ---
            { 
                name: 'Pedidos: Resumen', 
                value: 'getPedidosResumen', 
                description: 'GET Lista resumen de pedidos. Filtros JSON: { "idAuxi": 1, "idCtaAuxi": "C01", "fechaDesde": "...", "sSubSistema": "V" }.', action: 'Pedidos: Resumen a cc insumos',
            },
            { 
                name: 'Pedidos: Detalle y Cumplimiento', 
                value: 'getPedidosDetalle', 
                description: 'GET Lista detallada de pedidos con estado de entrega', action: 'Pedidos: Detalle y Cumplimiento a cc insumos',
            },
            // --- REMITOS ---
            { 
                name: 'Remitos: Resumen', 
                value: 'getRemitosResumen', 
                description: 'GET Lista resumen de remitos', action: 'Remitos: Resumen a cc insumos',
            },
            { 
                name: 'Remitos: Detalle y Cumplimiento', 
                value: 'getRemitosDetalle', 
                description: 'GET Lista detallada de remitos con estado de facturación', action: 'Remitos: Detalle y Cumplimiento a cc insumos',
            },
            // --- FACTURAS ---
            { 
                name: 'Facturas: Resumen', 
                value: 'getFacturasResumen', 
                description: 'GET Lista resumen de facturas', action: 'Facturas: Resumen a cc insumos',
            },
            { 
                name: 'Facturas: Detalle', 
                value: 'getFacturasDetalle', 
                description: 'GET Lista detallada de facturas', action: 'Facturas: Detalle a cc insumos',
            },
            // --- ESPECÍFICOS ---
            { 
                name: 'Consultar Comprobante Único', 
                value: 'getComprobanteCumplimiento', 
                description: 'GET Detalle de cumplimientos de un comprobante específico (por ID Cabecera)', action: 'Consultar Comprobante Único a cc insumos',
            },
        ],
        default: 'getPedidosResumen',
    },
];

export const ccInsumosFields: INodeProperties[] = [
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