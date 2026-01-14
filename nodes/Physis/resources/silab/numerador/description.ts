import { INodeProperties } from 'n8n-workflow';

export const numeradorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['numerador'] } },
        options: [
            { 
                name: 'Listar Todos', 
                value: 'getAll', 
                description: 'GET Devuelve todos los numeradores disponibles.' 
            },
            { 
                name: 'Listar por Tipo (Prefijo)', 
                value: 'getByPrefijo', 
                description: 'GET Filtra numeradores según si usan prefijo (Punto de Venta) o no.' 
            },
        ],
        default: 'getAll',
    },
];

export const numeradorFields: INodeProperties[] = [
    {
        displayName: 'JSON Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['numerador'],
                operation: ['getByPrefijo']
            } 
        },
        description: 'Filtros de búsqueda. Ej: { "prefijo": true } para numeradores con punto de venta, o { "prefijo": false } para internos.',
    },
];