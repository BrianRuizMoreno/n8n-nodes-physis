import { INodeProperties } from 'n8n-workflow';

export const dominioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['dominio'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve lista de dominios (máscaras, configuraciones)', action: 'Listar todos a dominio',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve un dominio específico', action: 'Obtener por ID a dominio',},
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
        description: 'Identificador numérico del dominio',
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
        description: 'Filtros opcionales para el listado',
    },
];