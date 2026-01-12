import { INodeProperties } from 'n8n-workflow';

export const campoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['campo'] } },
        options: [
            { 
                name: 'Listar Todos', 
                value: 'getAll', 
                description: 'GET Lista de campos. Filtros: CodZona, formatoRespuesta.' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Datos de un campo específico (CodCampo).' 
            },
            { 
                name: 'Obtener Depósitos', 
                value: 'getDepositos', 
                description: 'GET Lista de campos depósitos (Campos Lotes).' 
            },
        ],
        default: 'getAll',
    },
];

export const campoFields: INodeProperties[] = [
    {
        displayName: 'ID Campo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['campo'], 
                operation: ['get'] 
            } 
        },
        description: 'Ingrese el CodCampo.',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['campo'],
                operation: ['getAll', 'getDepositos'] 
            } 
        },
        description: 'Parámetros opcionales. Ej: {"CodZona": 1} o {"formatoRespuesta": "CSV"}.',
    },
];