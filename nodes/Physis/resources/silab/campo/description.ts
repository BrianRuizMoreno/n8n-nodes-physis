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
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Lista de campos. Filtros: CodZona, formatoRespuesta.',
                action: 'Listar Todos a campo',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Datos de un campo específico (CodCampo)',
                action: 'Obtener por ID a campo',
            },
            { 
                name: 'Obtener Depósitos', 
                value: 'getDepositos', 
                description: 'GET Lista de campos depósitos (Campos Lotes)',
                action: 'Obtener Depósitos a campo',
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
        description: 'Ingrese el CodCampo',
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