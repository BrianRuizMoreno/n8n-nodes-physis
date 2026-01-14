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
                description: 'GET Lista resumen de pedidos. Filtros JSON: { "idAuxi": 1, "idCtaAuxi": "C01", "fechaDesde": "...", "sSubSistema": "V" }.' 
            },
            { 
                name: 'Pedidos: Detalle y Cumplimiento', 
                value: 'getPedidosDetalle', 
                description: 'GET Lista detallada de pedidos con estado de entrega.' 
            },
            // --- REMITOS ---
            { 
                name: 'Remitos: Resumen', 
                value: 'getRemitosResumen', 
                description: 'GET Lista resumen de remitos.' 
            },
            { 
                name: 'Remitos: Detalle y Cumplimiento', 
                value: 'getRemitosDetalle', 
                description: 'GET Lista detallada de remitos con estado de facturación.' 
            },
            // --- FACTURAS ---
            { 
                name: 'Facturas: Resumen', 
                value: 'getFacturasResumen', 
                description: 'GET Lista resumen de facturas.' 
            },
            { 
                name: 'Facturas: Detalle', 
                value: 'getFacturasDetalle', 
                description: 'GET Lista detallada de facturas.' 
            },
            // --- ESPECÍFICOS ---
            { 
                name: 'Consultar Comprobante Único', 
                value: 'getComprobanteCumplimiento', 
                description: 'GET Detalle de cumplimientos de un comprobante específico (por ID Cabecera).' 
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
        description: 'Identificador único del comprobante (idCabecera).',
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