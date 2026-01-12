import { INodeProperties } from 'n8n-workflow';

export const loteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['lote'] } },
        options: [
            { 
                name: 'Listar Todos', 
                value: 'getAll', 
                description: 'GET Lista de lotes. Filtros: CodCampo, formatoRespuesta.' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Datos de un lote específico (CodLote).' 
            },
            { 
                name: 'Lotes por Actividad', 
                value: 'getByActivity', 
                description: 'GET Lotes asociados a una actividad. Filtros: CodCampania, CodCampo.' 
            },
            { 
                name: 'Obtener Árbol', 
                value: 'getTree', 
                description: 'GET Estructura de árbol de lotes (sin parámetros).' 
            },
            { 
                name: 'Obtener Árbol con Actividades', 
                value: 'getTreeActivities', 
                description: 'GET Estructura de árbol con actividades asignadas. Filtro: CodCampania.' 
            },
        ],
        default: 'getAll',
    },
];

export const loteFields: INodeProperties[] = [
    {
        displayName: 'ID Lote / Actividad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['lote'], 
                operation: ['get', 'getByActivity'] 
            } 
        },
        description: 'Ingrese el CodLote (para "Obtener por ID") o el IdActividad (para "Lotes por Actividad").',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['lote'],
                operation: ['getAll', 'getByActivity', 'getTreeActivities'] 
            } 
        },
        description: 'Ejemplos: {"CodCampo": 1}, {"CodCampania": 2024}, {"formatoRespuesta": "CSV"}.',
    },
];