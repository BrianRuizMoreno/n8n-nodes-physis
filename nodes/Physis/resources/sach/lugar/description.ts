import { INodeProperties } from 'n8n-workflow';

export const lugarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['lugar'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los lugares', action: 'Listar Todos a lugar',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un lugar específico', action: 'Obtener por ID a lugar',},
            { name: 'Consulta Avanzada', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros, orden y paginado (vía JSON)', action: 'Consulta Avanzada a lugar',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo lugar', action: 'Crear a lugar',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un lugar existente', action: 'Actualizar a lugar',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un lugar', action: 'Eliminar a lugar',},
            { name: 'Listar Prefijos', value: 'getPrefijos', description: 'GET Lista prefijos disponibles para lugares', action: 'Listar Prefijos a lugar',},
            { name: 'Listar Partidos', value: 'getPartidos', description: 'GET Lista partidos (departamentos/distritos)', action: 'Listar Partidos a lugar',},
        ],
        default: 'getAll',
    },
];

export const lugarFields: INodeProperties[] = [
    {
        displayName: 'ID Lugar',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['lugar'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del lugar (string)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['lugar'],
                operation: ['create', 'update', 'searchV2']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar (Objeto Lugar) o Filtro complejo para SearchV2',
    },
];