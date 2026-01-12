import { INodeProperties } from 'n8n-workflow';

export const estadoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['estado'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los estados.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un estado específico.' },
            { name: 'Consulta Avanzada', value: 'search', description: 'POST Búsqueda con filtros y paginado.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo estado.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un estado existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un estado.' },
        ],
        default: 'getAll',
    },
];

export const estadoFields: INodeProperties[] = [
    {
        displayName: 'ID Estado',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['estado'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico del estado.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['estado'],
                operation: ['create', 'update', 'search']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar (idEstado, descripcion, porDefecto) o Filtros para Consulta Avanzada.',
    },
];