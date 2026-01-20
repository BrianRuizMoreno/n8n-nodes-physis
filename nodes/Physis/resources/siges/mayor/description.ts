import { INodeProperties } from 'n8n-workflow';

export const mayorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['mayor'] } },
        options: [
            { name: 'Consultar Mayor', value: 'getMayor', description: 'GET Devuelve el Libro Mayor. Filtros en JSON.', action: 'Consultar Mayor a mayor',},
            { name: 'Comprobantes Referenciados', value: 'getReferenciados', description: 'GET Devuelve comprobantes relacionados a una línea del mayor', action: 'Comprobantes Referenciados a mayor',},
        ],
        default: 'getMayor',
    },
];

export const mayorFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{\n  "fechaDesde": "2024-01-01",\n  "fechaHasta": "2024-12-31",\n  "tipoInforme": 0,\n  "opciones": 0\n}',
        displayOptions: { show: { service: ['siges'], resource: ['mayor'] } },
        description: 'Filtros de búsqueda (fechas, tipoInforme, cuentas, etc.) o parámetros de referencia',
    },
];