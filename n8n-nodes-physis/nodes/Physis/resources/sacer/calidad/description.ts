import { INodeProperties } from 'n8n-workflow';

export const calidadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['calidad'] } },
        options: [

            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una calidad', action: 'Actualizar a calidad',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva calidad', action: 'Crear a calidad',},
            { name: 'Consulta Tabla', value: 'tableSearch', description: 'POST Consulta avanzada con filtros y paginado', action: 'Consulta tabla a calidad',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una calidad', action: 'Eliminar a calidad',},
            { name: 'Get Many', value: 'getAll', description: 'GET Lista calidades (filtro opcional por Cereal)', action: 'Listar calidades a calidad',},
            { name: 'Listar Agrupaciones Por Cereal', value: 'getAgrupacionesByCereal', description: 'GET Agrupaciones de calidades de un cereal', action: 'Listar agrupaciones por cereal a calidad',},
            { name: 'Listar Por Cereal', value: 'getByCereal', description: 'GET Lista calidades asociadas a un cereal específico', action: 'Listar por cereal a calidad',},
            { name: 'Obtener Agrupación', value: 'getAgrupacion', description: 'GET Detalle de una agrupación por código', action: 'Obtener agrupaci n a calidad',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de una calidad', action: 'Obtener por ID a calidad',},
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
        description: 'Código identificador de la calidad',
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
        description: 'Código de la agrupación de calidades',
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
        description: 'Cuerpo del objeto Calidad o filtros de consulta',
    },
];