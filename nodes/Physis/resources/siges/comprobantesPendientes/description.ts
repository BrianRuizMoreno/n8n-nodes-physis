import { INodeProperties } from 'n8n-workflow';

export const comprobantePendienteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['comprobantePendiente'] } },
        options: [
            { 
                name: 'Listar Pendientes (Proceso)', 
                value: 'getAll', 
                description: 'GET Devuelve comprobantes pendientes de autorización, envío a AFIP o procesamiento.' 
            },
            { 
                name: 'Listar Detallado', 
                value: 'getDetailed', 
                description: 'GET Igual que Listar, pero incluye datos extendidos del tercero.' 
            },
            { 
                name: 'Obtener Detalle', 
                value: 'get', 
                description: 'GET Recupera un comprobante pendiente específico.' 
            },
            { 
                name: 'Obtener Resumen (Cantidades)', 
                value: 'getSummary', 
                description: 'GET Devuelve conteos agrupados de pendientes.' 
            },
            { 
                name: 'Contar Errores', 
                value: 'getErrorCounts', 
                description: 'GET Devuelve cantidad de comprobantes con errores de validación.' 
            },
        ],
        default: 'getAll',
    },
];

export const comprobantePendienteFields: INodeProperties[] = [

    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobantePendiente'],
                operation: ['get'] 
            } 
        },
        description: 'Identificador único del comprobante.',
    },
    {
        displayName: 'ID Usuario',
        name: 'idUsuario',
        type: 'number',
        default: 0,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobantePendiente'],
                operation: ['get', 'getErrorCounts'] 
            } 
        },
        description: 'Filtrar por usuario responsable.',
    },
    {
        displayName: 'ID Plan Principal',
        name: 'idPpal',
        type: 'number',
        default: 1,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobantePendiente'],
                operation: ['getErrorCounts'] 
            } 
        },
        description: 'Contexto del plan contable (Generalmente 1).',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobantePendiente'],
                operation: ['getAll', 'getDetailed', 'getSummary'] 
            } 
        },
        description: 'Filtros de fecha, tipo de comprobante, estado de autorización, etc. Ej: { "fechaDesde": "...", "pendienteEnvio": true }',
    },
];