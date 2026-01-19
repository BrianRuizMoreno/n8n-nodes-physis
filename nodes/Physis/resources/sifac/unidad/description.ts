import { INodeProperties } from 'n8n-workflow';

export const unidadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['unidad'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista unidades de medida', action: 'Listar Todas an unidad',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene una unidad específica', action: 'Obtener por ID an unidad',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva unidad', action: 'Crear an unidad',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una unidad existente', action: 'Actualizar an unidad',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una unidad', action: 'Eliminar an unidad',},
        ],
        default: 'getAll',
    },
];

export const unidadFields: INodeProperties[] = [
    {
        displayName: 'ID Unidad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['unidad'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador de la unidad (ej: KG, LT)',
    },
    {
        displayName: 'JSON Body / Parámetros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['unidad']
            } 
        },
        description: 'Cuerpo del objeto. Para update incluir "idUnidadAnterior" si cambia el ID. Para filtros de listado usar "mostrarDadosBaja": true.',
    },
];