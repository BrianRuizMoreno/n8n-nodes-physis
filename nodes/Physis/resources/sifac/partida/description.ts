import { INodeProperties } from 'n8n-workflow';

export const partidaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['partida'] } },
        options: [
            { name: 'Listar Partidas (Producto)', value: 'getByProducto', description: 'GET Partidas de un producto.' },
            { name: 'Listar Partidas (General)', value: 'getAll', description: 'GET Búsqueda de partidas.' },
            { name: 'Crear Partida', value: 'create', description: 'POST Inserta nueva partida.' },
            { name: 'Actualizar Partida', value: 'update', description: 'PUT Modifica partida existente.' },
            { name: 'Eliminar Partida', value: 'delete', description: 'DELETE Elimina una partida.' },
        ],
        default: 'getAll',
    },
];

export const partidaFields: INodeProperties[] = [
    {
        displayName: 'ID (Producto o Partida)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['partida'] },
            hide: { operation: ['getAll', 'create', 'update'] }
        },
        description: 'ID Producto (para "Listar Partidas Producto") o ID Partida (para Delete).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['partida'] } },
        description: 'Cuerpo para POST/PUT (incluir parámetros flags como "ingresoTropa": true aquí) o Filtros GET.',
    },
];