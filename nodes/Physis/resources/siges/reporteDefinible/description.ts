import { INodeProperties } from 'n8n-workflow';

export const reporteDefinibleOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reporteDefinible'] } },
        options: [
            { name: 'Listar Reportes', value: 'getAll', description: 'GET Lista reportes definibles.' },
            { name: 'Descargar PDF', value: 'getPdf', description: 'GET Genera y descarga PDF de reporte.' },
            { name: 'Obtener Resumen', value: 'getResumen', description: 'GET Resumen de reporte generado.' },
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
        description: 'Filtros (IdDefinido, idtipoformato, idformato, etc).',
    },
];