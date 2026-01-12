import { INodeProperties } from 'n8n-workflow';

export const calidadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['calidad'] } },
        options: [

            { name: 'Listar Calidades', value: 'getAll', description: 'GET Lista calidades (filtro opcional por Cereal).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de una calidad.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva calidad.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una calidad.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una calidad.' },
            { name: 'Consulta Tabla', value: 'tableSearch', description: 'POST Consulta avanzada con filtros y paginado.' },
            { name: 'Listar por Cereal', value: 'getByCereal', description: 'GET Lista calidades asociadas a un cereal específico.' },
            { name: 'Listar Agrupaciones por Cereal', value: 'getAgrupacionesByCereal', description: 'GET Agrupaciones de calidades de un cereal.' },
            { name: 'Obtener Agrupación', value: 'getAgrupacion', description: 'GET Detalle de una agrupación por código.' },
        ],
        default: 'getAll',
    },
];

export const calidadFields: INodeProperties[] = [
    {
        displayName: 'Cód Calidad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['calidad'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador de la calidad.',
    },
    {
        displayName: 'Cód Cereal',
        name: 'codCereal',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['calidad'], 
                operation: ['getAll', 'getByCereal', 'getAgrupacionesByCereal'] 
            } 
        },
        description: 'Código del cereal. Requerido para operaciones "Por Cereal", opcional para "Listar Calidades".',
    },
    {
        displayName: 'Cód Agrupación',
        name: 'codAgrupacion',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['calidad'], 
                operation: ['getAgrupacion'] 
            } 
        },
        description: 'Código de la agrupación de calidades.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['calidad'],
                operation: ['create', 'update', 'tableSearch']
            } 
        },
        description: 'Cuerpo del objeto Calidad o filtros de consulta.',
    },
];