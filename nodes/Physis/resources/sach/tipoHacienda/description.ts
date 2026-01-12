import { INodeProperties } from 'n8n-workflow';

export const tipoHaciendaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tipoHacienda'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los tipos de hacienda.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un tipo de hacienda específico.' },
            { name: 'Consulta Avanzada (V2)', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros (vía JSON).' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de hacienda.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de hacienda existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de hacienda.' },
        ],
        default: 'getAll',
    },
];

export const tipoHaciendaFields: INodeProperties[] = [
    {
        displayName: 'ID Tipo Hacienda',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['tipoHacienda'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador del tipo de hacienda (string).',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['tipoHacienda'],
                operation: ['create', 'update', 'searchV2']
            } 
        },
        description: 'Cuerpo para Create/Update o Filtro complejo para SearchV2.',
    },
];