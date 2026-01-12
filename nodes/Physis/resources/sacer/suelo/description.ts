import { INodeProperties } from 'n8n-workflow';

export const sueloOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['suelo'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los suelos configurados.' },
            { name: 'Obtener por Código', value: 'get', description: 'GET Obtiene un suelo específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo suelo.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un suelo existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un suelo.' },
        ],
        default: 'getAll',
    },
];

export const sueloFields: INodeProperties[] = [
    {
        displayName: 'Cód Suelo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['suelo'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador del suelo.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['suelo'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos del suelo (codSuelo, descripcion, observaciones).',
    },
];