import { INodeProperties } from 'n8n-workflow';

export const libroOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['libro'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista libros contables', action: 'Listar libros a libro',},
            { name: 'Obtener Por ID', value: 'getById', description: 'GET Detalle de libro', action: 'Obtener por ID a libro',},
            { name: 'Obtener Por Fecha', value: 'getByDate', description: 'GET Libro por fecha', action: 'Obtener por fecha a libro',},
        ],
        default: 'getAll',
    },
];

export const libroFields: INodeProperties[] = [
    {
        displayName: 'ID Libro / Fecha',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['libro'], operation: ['getById', 'getByDate'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['libro'] } },
    },
];