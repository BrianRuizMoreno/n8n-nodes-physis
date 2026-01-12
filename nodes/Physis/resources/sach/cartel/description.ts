import { INodeProperties } from 'n8n-workflow';

export const cartelOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['cartel'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los carteles.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un cartel específico.' },
            { name: 'Consulta Avanzada', value: 'search', description: 'POST Búsqueda con filtros y paginado.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo cartel.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un cartel existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un cartel.' },
        ],
        default: 'getAll',
    },
];

export const cartelFields: INodeProperties[] = [
    {
        displayName: 'ID Cartel',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['cartel'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del cartel.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['cartel'],
                operation: ['create', 'update', 'search']
            } 
        },
        description: 'Cuerpo para crear/editar o estructura de consulta avanzada (filtros, paginado).',
    },
];