import { INodeProperties } from 'n8n-workflow';

export const dominioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['dominio'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Devuelve todos los dominios configurados (máscaras y grupos de datos)',
                action: 'Listar Todos a dominio',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Devuelve la configuración de un dominio específico (IDs 1 al 6)',
                action: 'Obtener por ID a dominio',
            },
        ],
        default: 'getAll',
    },
];

export const dominioFields: INodeProperties[] = [
    {
        displayName: 'ID Dominio',
        name: 'id',
        type: 'options',
        default: 1,
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['dominio'], 
                operation: ['get'] 
            } 
        },
        options: [
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
        ],
        description: 'Identificador del dominio a consultar',
    },
];