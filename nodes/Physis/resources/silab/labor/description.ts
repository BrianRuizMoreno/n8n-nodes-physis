import { INodeProperties } from 'n8n-workflow';

export const laborOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['labor'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Lista de labores. Opcional: formatoRespuesta.' 
																action: 'Listar Todas a labor',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Datos de una labor específica (IdLabor)' 
																action: 'Obtener por ID a labor',
            },
            { 
                name: 'Obtener Por Actividad', 
                value: 'getByActividad', 
                description: 'GET Labores asociadas a una actividad (IdActividad)' 
																action: 'Obtener por Actividad a labor',
            },
        ],
        default: 'getAll',
    },
];

export const laborFields: INodeProperties[] = [
    {
        displayName: 'ID Labor / Actividad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['labor'], 
                operation: ['get', 'getByActividad'] 
            } 
        },
        description: 'Ingrese el IdLabor (para "Obtener por ID") o el IdActividad (para "Obtener por Actividad")',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['labor'],
                operation: ['getAll'] 
            } 
        },
        description: 'Parámetros opcionales. Ej: {"formatoRespuesta": "CSV"}.',
    },
];