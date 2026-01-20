import { INodeProperties } from 'n8n-workflow';

export const reporteDefinibleOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reporteDefinible'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista reportes definibles', action: 'Listar Reportes a reporte definible',},
            { name: 'Descargar PDF', value: 'getPdf', description: 'GET Genera y descarga PDF de reporte', action: 'Descargar PDF a reporte definible',},
            { name: 'Obtener Resumen', value: 'getResumen', description: 'GET Resumen de reporte generado', action: 'Obtener Resumen a reporte definible',},
        ],
        default: 'getAll',
    },
];

export const reporteDefinibleFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['reporteDefinible'] } },
        description: 'Filtros (IdDefinido, idtipoformato, idformato, etc)',
    },
];