import { INodeProperties } from 'n8n-workflow';

export const implementoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['implemento'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll',  
                description: 'GET Lista de implementos. Opcional: formatoRespuesta.',
                action: 'Obtener Implementos an implemento',
            },
            { 
                name: 'Obtener Maquinarias', 
                value: 'getAllMaq', 
                description: 'GET Lista de maquinarias. Opcional: formatoRespuesta.',
                action: 'Obtener Maquinarias an implemento',
            },
            { 
                name: 'Obtener Implemento Por ID', 
                value: 'get', 
                description: 'GET Datos de un implemento por IdImplemento',
                action: 'Obtener Implemento por ID an implemento',
            },
            { 
                name: 'Obtener Implemento Por Nombre', 
                value: 'getByName', 
                description: 'GET Buscar implemento por nombre',
                action: 'Obtener Implemento por Nombre an implemento',
            },
            { 
                name: 'Obtener Maquinaria Por Nombre', 
                value: 'getMaqByName', 
                description: 'GET Buscar maquinaria por nombre',
                action: 'Obtener Maquinaria por Nombre an implemento',
            },
            { 
                name: 'Obtener Implementos por Labor', 
                value: 'getByLabor', 
                description: 'GET Implementos de una labor. Opcional: SinOtraMaquinaria.',
                action: 'Obtener Implementos por Labor an implemento',
            },
            { 
                name: 'Obtener Maquinarias por Labor', 
                value: 'getMaqByLabor', 
                description: 'GET Maquinarias de una labor',
                action: 'Obtener Maquinarias por Labor an implemento',
            },
        ],
        default: 'getAll',
    },
];

export const implementoFields: INodeProperties[] = [
    {
        displayName: 'ID / Nombre / Labor',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['implemento'], 
                operation: ['get', 'getByName', 'getMaqByName', 'getByLabor', 'getMaqByLabor'] 
            } 
        },
        description: 'Ingrese el IdImplemento, Nombre o IdLabor según corresponda a la operación',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['implemento'],
                operation: ['getAll', 'getAllMaq', 'getByLabor', 'getByName', 'getMaqByName'] 
            } 
        },
        description: 'Parámetros opcionales. Ej: {"formatoRespuesta": "CSV"}, {"SinOtraMaquinaria": true}, {"FiltroByNombre": "..."}.',
    },
];