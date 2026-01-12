import { INodeProperties } from 'n8n-workflow';

export const precioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['precio'] } },
        options: [
            { name: 'Listar Listas de Precios', value: 'getListas', description: 'GET Listas de precios disponibles.' },
            { name: 'Productos en Lista', value: 'getProductosLista', description: 'GET Productos pertenecientes a una lista.' },
            { name: 'Precios de Producto', value: 'getPreciosProducto', description: 'GET Todos los precios de un producto.' },
            { name: 'Precio en Lista Específica', value: 'getPrecioProductoEnLista', description: 'GET Precio de un producto en una lista.' },
            { name: 'Precios y Existencia', value: 'getPreciosExistencia', description: 'GET Reporte combinado.' },
            { name: 'Actualizar Precios', value: 'upsertListaPrecios', description: 'POST Inserta/Modifica/Elimina precios.' },
        ],
        default: 'getListas',
    },
];

export const precioFields: INodeProperties[] = [
    {
        displayName: 'ID (Producto o Lista)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['precio'] },
            hide: { operation: ['getListas', 'getPreciosExistencia'] }
        },
        description: 'ID de la Lista (para "Productos en Lista") o ID del Producto (para resto).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['precio'] } },
        description: 'Params: texto, fecha, idLista (para "Precio en Lista Específica"), body array para POST.',
    },
];