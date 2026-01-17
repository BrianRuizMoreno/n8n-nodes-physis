import { INodeProperties } from 'n8n-workflow';

export const cerealOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['cereal'] } },
        options: [

			{ name: 'Cereales: Listar', value: 'getCereales', description: 'GET Lista de cereales',																																																					action: 'Cereales: Listar a cereal',},
            { name: 'Cereales: Consulta Avanzada', value: 'getCerealesGrid', description: 'POST Consulta con filtros, paginado y orden (Grid)', action: 'Cereales: Consulta Avanzada a cereal',},
            { name: 'Cereales: Obtener', value: 'getCereal', description: 'GET Datos de un cereal por ID', action: 'Cereales: Obtener a cereal',},
            { name: 'Cereales: Crear', value: 'createCereal', description: 'POST Crea un nuevo cereal', action: 'Cereales: Crear a cereal',},
            { name: 'Cereales: Actualizar', value: 'updateCereal', description: 'PUT Modifica un cereal existente', action: 'Cereales: Actualizar a cereal',},
            { name: 'Cereales: Eliminar', value: 'deleteCereal', description: 'DELETE Elimina un cereal', action: 'Cereales: Eliminar a cereal',},        
            { name: 'Cereales: Listar Variedades', value: 'getVariedades', description: 'GET Variedades de un cereal específico', action: 'Cereales: Listar Variedades a cereal',},
            { name: 'Cereales: Listar Productos', value: 'getProductosCereal', description: 'GET Productos asociados a un cereal', action: 'Cereales: Listar Productos a cereal',},
            { name: 'Cereales: Agregar Productos', value: 'addProductosCereal', description: 'POST Asocia productos a un cereal', action: 'Cereales: Agregar Productos a cereal',},
            { name: 'Calidades: Listar', value: 'getCalidades', description: 'GET Lista calidades. Filtro opcional: { "codCereal": 1 }.', action: 'Calidades: Listar a cereal',},
            { name: 'Calidades: Consulta Avanzada', value: 'getCalidadesGrid', description: 'POST Consulta con filtros, paginado y orden (Grid)', action: 'Calidades: Consulta Avanzada a cereal',},
            { name: 'Calidades: Obtener', value: 'getCalidad', description: 'GET Obtiene una calidad por código', action: 'Calidades: Obtener a cereal',},
            { name: 'Calidades: Por Cereal', value: 'getCalidadesPorCereal', description: 'GET Calidades asociadas a un ID Cereal', action: 'Calidades: Por Cereal a cereal',},
            { name: 'Calidades: Agrupaciones (Por Cereal)', value: 'getAgrupacionesPorCereal', description: 'GET Agrupaciones de calidades de un cereal', action: 'Calidades: Agrupaciones (Por Cereal) a cereal',},
            { name: 'Calidades: Agrupaciones (Por ID)', value: 'getAgrupacion', description: 'GET Una agrupación específica por ID', action: 'Calidades: Agrupaciones (Por ID) a cereal',},
            { name: 'Calidades: Crear', value: 'createCalidad', description: 'POST Crea una nueva calidad', action: 'Calidades: Crear a cereal',},
            { name: 'Calidades: Actualizar', value: 'updateCalidad', description: 'PUT Modifica una calidad', action: 'Calidades: Actualizar a cereal',},
            { name: 'Calidades: Eliminar', value: 'deleteCalidad', description: 'DELETE Elimina una calidad', action: 'Calidades: Eliminar a cereal',},
        ],
        default: 'getCereales',
    },
];

export const cerealFields: INodeProperties[] = [
    {
        displayName: 'ID Cereal / Calidad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['cereal'], 
                operation: [
                    'getCereal', 'deleteCereal', 
                    'getVariedades', 'getProductosCereal', 'addProductosCereal',
                    'getCalidad', 'deleteCalidad',
                    'getCalidadesPorCereal', 'getAgrupacionesPorCereal', 'getAgrupacion'
                ] 
            } 
        },
        description: 'ID del Cereal, Código de Calidad o ID de Agrupación',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['cereal'],
                operation: [
                    'getCerealesGrid', 
                    'createCereal', 'updateCereal', 'addProductosCereal',
                    'getCalidades', 'getCalidadesGrid',
                    'createCalidad', 'updateCalidad'
                ] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, Filtros Grid, o Lista de Productos',
    },
];