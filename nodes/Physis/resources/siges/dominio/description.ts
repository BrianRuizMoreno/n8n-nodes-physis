import { INodeProperties } from 'n8n-workflow';

export const dominioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['dominio'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Devuelve lista de dominios (máscaras, configuraciones).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Devuelve un dominio específico.' },
        ],
        default: 'getAll',
    },
];

export const dominioFields: INodeProperties[] = [
    {
        displayName: 'ID Dominio',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['dominio'], 
                operation: ['get'] 
            } 
        },
        description: 'Identificador numérico del dominio.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['dominio'] 
            } 
        },
        description: 'Filtros opcionales para el listado.',
    },
];