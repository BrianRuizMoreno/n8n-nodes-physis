import { INodeProperties } from 'n8n-workflow';

export const depositoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['deposito'] } },
        options: [
            { name: 'Listar/Buscar', value: 'getAll', description: 'GET Buscar depósitos con filtros.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Depósito específico.' },
            { name: 'Crear', value: 'create', description: 'POST Nuevo depósito.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modificar depósito.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Eliminar depósito.' },
        ],
        default: 'getAll',
    },
];

export const depositoFields: INodeProperties[] = [
    {
        displayName: 'ID Depósito',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['deposito'], operation: ['get', 'delete'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['deposito'] } },
        description: 'Filtros: criterio, conCampos, mostrarStock, etc. O Body para create/update.',
    },
];