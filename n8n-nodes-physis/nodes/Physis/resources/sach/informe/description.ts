import { INodeProperties } from 'n8n-workflow';

export const informeOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['informe'] } },
        options: [
            { name: 'Comisiones Por Comprobante', value: 'getComisionesComprobante', description: 'GET Devuelve las comisiones asociadas a un comprobante específico', action: 'Comisiones por comprobante an informe',},
            { name: 'Reporte Comisiones Devengadas', value: 'getComisionesDevengadas', description: 'GET Reporte detallado de comisiones devengadas con múltiples filtros', action: 'Reporte comisiones devengadas an informe',},
            { name: 'Resumen De Operaciones', value: 'getResumenOperaciones', description: 'GET Informe de resumen de operaciones por fecha', action: 'Resumen de operaciones an informe',},
        ],
        default: 'getComisionesComprobante',
    },
];

export const informeFields: INodeProperties[] = [

    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['informe'], 
                operation: ['getComisionesComprobante'] 
            } 
        },
        description: 'Identificador del comprobante para consultar sus comisiones',
    },
    {
        displayName: 'Filtros / Parámetros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['informe'],
                operation: ['getComisionesDevengadas', 'getResumenOperaciones']
            } 
        },
        description: 'Parámetros Query String. \n' +
                     'Ej. Devengadas: {"Inicio": "2023-01-01", "Fin": "2023-01-31", "QueFecha": "O", "cuentas": "123,456"}.\n' +
                     'Ej. Resumen: {"FechaDesde": "2023-01-01", "FechaHasta": "2023-01-31", "EsResumido": true}.',
    },
];