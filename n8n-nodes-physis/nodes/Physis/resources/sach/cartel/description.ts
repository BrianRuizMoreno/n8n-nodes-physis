import { INodeProperties } from 'n8n-workflow';

export const cartelOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['cartel'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los carteles', action: 'Listar todos a cartel',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un cartel específico', action: 'Obtener por ID a cartel',},
            { name: 'Consulta Avanzada', value: 'search', description: 'POST Búsqueda con filtros y paginado', action: 'Consulta avanzada a cartel',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo cartel', action: 'Crear a cartel',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un cartel existente', action: 'Actualizar a cartel',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un cartel', action: 'Eliminar a cartel',},
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
        description: 'Identificador del cartel',
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
        description: 'Cuerpo para crear/editar o estructura de consulta avanzada (filtros, paginado)',
    },
];