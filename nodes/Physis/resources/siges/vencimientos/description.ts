import { INodeProperties } from 'n8n-workflow';

export const vencimientosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['vencimientos'] } },
        options: [
            { 
                name: 'Obtener Vencimientos Reagrupados', 
                value: 'getGroupedMaturities', 
                description: 'GET Devuelve proyecciones de deuda agrupadas por criterios auxiliares (Zonas, Actividades)', 
			    action: 'Obtener vencimientos reagrupados a vencimientos',
            },
        ],
        default: 'getGroupedMaturities',
    },
];

export const vencimientosFields: INodeProperties[] = [
    {
        displayName: 'ID Plan Auxiliar',
        name: 'idAuxi',
        type: 'number',
        default: 100,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['vencimientos'],
                operation: ['getGroupedMaturities'] 
            } 
        },
        description: 'Plan sobre el cual analizar vencimientos (ej: 100=Clientes, 200=Proveedores)',
    },
    {
        displayName: 'ID Plan Reagrupación',
        name: 'idReagAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['vencimientos'],
                operation: ['getGroupedMaturities'] 
            } 
        },
        description: 'Criterio de agrupación (ej: 10=Zonas, 5=Rubros)',
    },
    {
        displayName: 'Fecha Desde',
        name: 'fechaDesde',
        type: 'dateTime',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['vencimientos'],
                operation: ['getGroupedMaturities'] 
            } 
        },
        description: 'Fecha de corte inicial para el análisis',
    },
    {
        displayName: 'ID Cuenta Reagrupación (Opcional)',
        name: 'idCtaReagAuxi',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['vencimientos'],
                operation: ['getGroupedMaturities'] 
            } 
        },
        description: 'Filtrar por una agrupación específica (ej: "ZN" para Zona Norte). Si se omite, trae todas las agrupaciones.',
    },
];