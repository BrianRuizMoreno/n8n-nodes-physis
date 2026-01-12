import { INodeProperties } from 'n8n-workflow';

export const productoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['producto'] } },
        options: [
            { name: 'Stock Disponible', value: 'getStock', description: 'GET Stock de un producto.' },
            { name: 'Estructura de Productos', value: 'getEstructura', description: 'GET Consulta estructura/catálogo.' },
        ],
        default: 'getStock',
    },
];

export const productoFields: INodeProperties[] = [
    {
        displayName: 'ID Producto',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['producto'], operation: ['getStock'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['producto'] } },
    },
];