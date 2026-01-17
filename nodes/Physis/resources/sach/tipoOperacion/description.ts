import { INodeProperties } from 'n8n-workflow';

export const tipoOperacionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tipoOperacion'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los tipos de operación', action: 'Listar Todos a tipo operacion',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un tipo de operación específico', action: 'Obtener por ID a tipo operacion',},
            { name: 'Consulta Avanzada', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros, orden y paginado (vía JSON)', action: 'Consulta Avanzada a tipo operacion',},
            { name: 'Ver Numeración', value: 'getNumeracion', description: 'GET Consulta la numeración/remates de operaciones', action: 'Ver Numeración a tipo operacion',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de operación', action: 'Crear a tipo operacion',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de operación existente', action: 'Actualizar a tipo operacion',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de operación', action: 'Eliminar a tipo operacion',},
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
        description: 'Código identificador del tipo de operación',
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