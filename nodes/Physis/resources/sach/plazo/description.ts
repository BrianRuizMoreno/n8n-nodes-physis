import { INodeProperties } from 'n8n-workflow';

export const plazoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['plazo'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los plazos.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un plazo específico.' },
            { name: 'Consulta Avanzada', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros, orden y paginado (vía JSON).' },
            { name: 'Listar por Cliente/Lugar', value: 'getByCliente', description: 'GET Lista plazos permitidos para un cliente/operación.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo plazo.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un plazo existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un plazo.' },
        ],
        default: 'getAll',
    },
];

export const plazoFields: INodeProperties[] = [
    {
        displayName: 'ID Plazo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['plazo'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico del plazo.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['plazo']
            } 
        },
        description: 'Cuerpo para Create/Update, Filtro complejo para SearchV2, o parámetros Query String para getByCliente (IdLugar, IdCtaAuxi, etc.).',
    },
];