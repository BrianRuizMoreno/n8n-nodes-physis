import { INodeProperties } from 'n8n-workflow';

export const tipoOperacionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tipoOperacion'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los tipos de operación.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un tipo de operación específico.' },
            { name: 'Consulta Avanzada', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros, orden y paginado (vía JSON).' },
            { name: 'Ver Numeración', value: 'getNumeracion', description: 'GET Consulta la numeración/remates de operaciones.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de operación.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de operación existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de operación.' },
        ],
        default: 'getAll',
    },
];

export const tipoOperacionFields: INodeProperties[] = [
    {
        displayName: 'ID Tipo Operación',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['tipoOperacion'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador del tipo de operación.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['tipoOperacion'],
                operation: ['create', 'update', 'searchV2', 'getNumeracion']
            } 
        },
        description: 'Para Create/Update: Objeto completo. Para SearchV2: Objeto filtro complejo. Para Numeracion: { "IdTipoOperacion": "...", "Fecha": "..." }.',
    },
];