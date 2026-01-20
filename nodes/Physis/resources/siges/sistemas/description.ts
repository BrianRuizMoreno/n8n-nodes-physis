import { INodeProperties } from 'n8n-workflow';

export const sistemasOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['sistemas'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Devuelve la lista de sistemas o módulos configurados en el ERP', 
                action: 'Listar sistemas a sistemas',
            },
            { 
                name: 'Obtener Sistema', 
                value: 'get', 
                description: 'GET Recupera los datos de un sistema específico por ID', 
                action: 'Obtener sistema a sistemas',
            },
        ],
        default: 'getAll',
    },
];

export const sistemasFields: INodeProperties[] = [
    {
        displayName: 'ID Sistema',
        name: 'idSistemas',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['sistemas'],
                operation: ['get'] 
            } 
        },
        description: 'Identificador numérico del módulo o sistema',
    },
];