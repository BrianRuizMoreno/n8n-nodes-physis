import { INodeProperties } from 'n8n-workflow';

export const campaniaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['campania'] } },
        options: [
            { 
                name: 'Listar Todas', 
                value: 'getAll', 
                description: 'GET Lista de campañas. Filtro opcional: idUsuario.' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Datos de una campaña específica (CodCampania).' 
            },
        ],
        default: 'getAll',
    },
];

export const campaniaFields: INodeProperties[] = [
    {
        displayName: 'ID Campaña',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['campania'], 
                operation: ['get'] 
            } 
        },
        description: 'Ingrese el CodCampania.',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['campania'],
                operation: ['getAll'] 
            } 
        },
        description: 'Parámetros opcionales. Ej: {"idUsuario": 123}.',
    },
];