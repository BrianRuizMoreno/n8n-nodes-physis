import { INodeProperties } from 'n8n-workflow';

export const formatoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['formato'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista formatos (filtro opcional por Tipo en JSON).' },
            { name: 'Listar por Tipo', value: 'getByType', description: 'GET Lista formatos de un Tipo específico.' },
            { name: 'Obtener Detalle', value: 'get', description: 'GET Detalle de formato (Req: ID y ID Tipo).' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo formato.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un formato existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un formato.' },
        ],
        default: 'getAll',
    },
];

export const formatoFields: INodeProperties[] = [
    {
        displayName: 'ID Formato',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['formato'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del formato.',
    },
    {
        displayName: 'ID Tipo Formato',
        name: 'idTipoFormato',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['formato'], 
                operation: ['get', 'getByType'] 
            } 
        },
        description: 'Identificador del tipo de formato.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['formato']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar (ej: {"idTipoFormato": 1}).',
    },
];