import { INodeProperties } from 'n8n-workflow';

export const tipoTasaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['tipoTasa'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista tipos de tasas.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un tipo de tasa específico.' },
        ],
        default: 'getAll',
    },
];

export const tipoTasaFields: INodeProperties[] = [
    {
        displayName: 'ID Tipo Tasa',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['tipoTasa'], operation: ['get'] } },
        description: 'Identificador del tipo de tasa.',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['tipoTasa'], operation: ['getAll'] } },
        description: 'Ej: { "idAuxi": 0, "idCtaAuxi": "..." }',
    },
];