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
                name: 'Obtener Implementos', 
                value: 'getAll',  
                description: 'GET Lista de implementos. Opcional: formatoRespuesta.'
            },
            { 
                name: 'Obtener Maquinarias', 
                value: 'getAllMaq', 
                description: 'GET Lista de maquinarias. Opcional: formatoRespuesta.'
            },
            { 
                name: 'Obtener Implemento por ID', 
                value: 'get', 
                description: 'GET Datos de un implemento por IdImplemento.'
            },
            { 
                name: 'Obtener Implemento por Nombre', 
                value: 'getByName', 
                description: 'GET Buscar implemento por nombre.'
            },
            { 
                name: 'Obtener Maquinaria por Nombre', 
                value: 'getMaqByName', 
                description: 'GET Buscar maquinaria por nombre.'
            },
            { 
                name: 'Obtener Implementos por Labor', 
                value: 'getByLabor', 
                description: 'GET Implementos de una labor. Opcional: SinOtraMaquinaria.'
            },
            { 
                name: 'Obtener Maquinarias por Labor', 
                value: 'getMaqByLabor', 
                description: 'GET Maquinarias de una labor.'
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
        description: 'Ingrese el IdImplemento, Nombre o IdLabor según corresponda a la operación.',
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