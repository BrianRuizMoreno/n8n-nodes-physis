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
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Lista de lotes. Filtros: CodCampo, formatoRespuesta.',
                action: 'Listar Todos a lote',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Datos de un lote específico (CodLote)',
                action: 'Obtener por ID a lote',
            },
            { 
                name: 'Lotes Por Actividad', 
                value: 'getByActivity', 
                description: 'GET Lotes asociados a una actividad. Filtros: CodCampania, CodCampo.',
                action: 'Lotes por Actividad a lote',
            },
            { 
                name: 'Obtener Árbol', 
                value: 'getTree', 
                description: 'GET Estructura de árbol de lotes (sin parámetros)',
                action: 'Obtener Árbol a lote',
            },
            { 
                name: 'Obtener Árbol Con Actividades', 
                value: 'getTreeActivities', 
                description: 'GET Estructura de árbol con actividades asignadas. Filtro: CodCampania.',
                action: 'Obtener Árbol con Actividades a lote',
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
        description: 'Ingrese el CodLote (para "Obtener por ID") o el IdActividad (para "Lotes por Actividad")',
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
        description: 'Ejemplos: {"CodCampo": 1}, {"CodCampania": 2024}, {"formatoRespuesta": "CSV"}',
    },
];