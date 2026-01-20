import { INodeProperties } from 'n8n-workflow';

export const monedaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['moneda'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve todas las monedas disponibles', action: 'Listar Todas a moneda',},
            { name: 'Monedas De Registro', value: 'getRegistro', description: 'GET Monedas de registro. Si se indica ID trae solo una.', action: 'Monedas de Registro a moneda',},
            { name: 'Monedas Funcionales', value: 'getFuncional', description: 'GET Monedas funcionales. Si se indica ID trae solo una.', action: 'Monedas Funcionales a moneda',},
            { name: 'Estado Multimoneda', value: 'checkMultimoneda', description: 'GET Verifica si el módulo Multimoneda está activo', action: 'Estado Multimoneda a moneda',},
        ],
        default: 'getAll',
    },
];

export const monedaFields: INodeProperties[] = [
    {
        displayName: 'ID Moneda',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['moneda'], 
                operation: ['getRegistro', 'getFuncional'] 
            } 
        },
        description: 'Símbolo o ID de la moneda (opcional para listar todas)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['moneda'] 
            } 
        },
        description: 'Filtros adicionales si la API los soporta en el futuro',
    },
];