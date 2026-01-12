import { INodeProperties } from 'n8n-workflow';

export const marcaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['marca'] } },
        options: [
            { name: 'Listar Marcas (Cliente)', value: 'getAll', description: 'GET Lista marcas de un cliente específico.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene una marca específica de un cliente.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva marca.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Actualiza una marca existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una marca (Parámetros en JSON Body).' },
        ],
        default: 'getAll',
    },
];

export const marcaFields: INodeProperties[] = [
    {
        displayName: 'ID Marca',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['marca'], 
                operation: ['get'] 
            } 
        },
        description: 'Identificador numérico de la marca.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['marca']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar. Para Listar/Eliminar/Obtener: {"IdAuxi": 0, "IdCtaAuxi": "...", "IdMarca": 0}.',
    },
];