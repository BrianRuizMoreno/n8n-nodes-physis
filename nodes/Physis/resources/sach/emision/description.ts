import { INodeProperties } from 'n8n-workflow';

export const emisionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['emision'] } },
        options: [
            { name: 'Emitir (General)', value: 'emitir', description: 'GET Genera Facturas/Prefacturas masivas según filtros', action: 'Emitir (General) an emision',},
            { name: 'Emitir (Por Lotes)', value: 'emitirPorLotes', description: 'GET Genera Facturas/Prefacturas para lotes específicos', action: 'Emitir (Por Lotes) an emision',},
            { name: 'Anular Liquidación', value: 'anular', description: 'GET Anula una liquidación generando NCD', action: 'Anular Liquidación an emision',},
            { name: 'Listar Liquidaciones', value: 'listar', description: 'GET Devuelve listado de liquidaciones de Compra/Venta', action: 'Listar Liquidaciones an emision',},
        ],
        default: 'listar',
    },
];

export const emisionFields: INodeProperties[] = [
    {
        displayName: 'Parámetros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['emision']
            } 
        },
        description: 'Parámetros Query String requeridos para la operación.\n' +
                     '- Emitir: { "bPreemitir": true, "iTipoOperacion": 1, "dFechaEmision": "..." }\n' +
                     '- Por Lotes: { "lotesJson": "[...]", "bPreemitir": true }\n' +
                     '- Anular: { "IdComprobanteSACH": 123, "Observaciones": "..." }\n' +
                     '- Listar: { "FechaDesde": "...", "chkCC": true, "chkCV": true }',
    },
];