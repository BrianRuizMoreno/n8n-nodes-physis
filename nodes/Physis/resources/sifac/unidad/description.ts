import { INodeProperties } from 'n8n-workflow';

export const unidadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['unidad'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista unidades de medida.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene una unidad específica.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva unidad.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una unidad existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una unidad.' },
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
        description: 'Código identificador de la unidad (ej: KG, LT).',
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