import { INodeProperties } from 'n8n-workflow';

export const actividadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['actividad'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Lista de actividades. Filtros: Aplicacion, reducido, etc.',
                action: 'Listar todas an actividad',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Datos de una actividad específica (IdActividad)',
                action: 'Obtener por ID an actividad',
            },
            { 
                name: 'Obtener Lotes Asociados', 
                value: 'getLotes', 
                description: 'GET Lotes asociados a una actividad y fecha. Filtros: CodCampania, CodCampo.',
                action: 'Obtener lotes asociados an actividad',
            },
        ],
        default: 'getAll',
    },
];

export const actividadFields: INodeProperties[] = [
    {
        displayName: 'ID Actividad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['actividad'], 
                operation: ['get', 'getLotes'] 
            } 
        },
        description: 'Identificador de la actividad (String)',
    },
    {
        displayName: 'Fecha',
        name: 'fecha',
        type: 'dateTime',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['actividad'], 
                operation: ['getLotes'] 
            } 
        },
        description: 'Fecha asociada a la búsqueda de lotes',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['actividad'],
                operation: ['getAll', 'getLotes'] 
            } 
        },
        description: 'Parámetros opcionales. Ej: {"Aplicacion": 1} (para Listar) o {"CodCampania": 2024} (para Lotes).',
    },
];