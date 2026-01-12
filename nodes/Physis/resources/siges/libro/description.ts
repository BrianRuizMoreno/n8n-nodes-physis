import { INodeProperties } from 'n8n-workflow';

export const libroOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['libro'] } },
        options: [
            { name: 'Listar Libros', value: 'getAll', description: 'GET Lista libros contables.' },
            { name: 'Obtener por ID', value: 'getById', description: 'GET Detalle de libro.' },
            { name: 'Obtener por Fecha', value: 'getByDate', description: 'GET Libro por fecha.' },
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