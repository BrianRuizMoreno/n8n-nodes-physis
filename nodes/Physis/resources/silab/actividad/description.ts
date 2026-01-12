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
                name: 'Listar Todas', 
                value: 'getAll', 
                description: 'GET Lista de actividades. Filtros: Aplicacion, reducido, etc.' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Datos de una actividad específica (IdActividad).' 
            },
            { 
                name: 'Obtener Lotes Asociados', 
                value: 'getLotes', 
                description: 'GET Lotes asociados a una actividad y fecha. Filtros: CodCampania, CodCampo.' 
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
        description: 'Identificador de la actividad (String).',
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
        description: 'Fecha asociada a la búsqueda de lotes.',
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