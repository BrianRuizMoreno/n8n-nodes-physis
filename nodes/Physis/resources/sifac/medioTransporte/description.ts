import { INodeProperties } from 'n8n-workflow';

export const medioTransporteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['medioTransporte'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Todos los medios.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Medio específico.' },
            { name: 'Listar por Transportista', value: 'getByTransportista', description: 'GET Medios de un transportista.' },
            { name: 'Crear', value: 'create', description: 'POST Nuevo medio.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modificar medio.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Eliminar medio.' },
        ],
        default: 'getAll',
    },
];

export const medioTransporteFields: INodeProperties[] = [
    {
        displayName: 'ID Medio / Transportista',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['medioTransporte'], operation: ['get', 'update', 'delete', 'getByTransportista'] } 
        },
        description: 'ID del Medio de Transporte o ID del Transportista (para listar sus medios).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['medioTransporte'] } },
    },
];