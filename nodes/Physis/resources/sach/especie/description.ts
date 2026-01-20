import { INodeProperties } from 'n8n-workflow';

export const especieOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['especie'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todas las especies', action: 'Listar todas an especie',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene una especie específica', action: 'Obtener por ID an especie',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva especie', action: 'Crear an especie',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una especie existente', action: 'Actualizar an especie',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una especie', action: 'Eliminar an especie',},
        ],
        default: 'getAll',
    },
];

export const especieFields: INodeProperties[] = [
    {
        displayName: 'ID Especie',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['especie'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico de la especie',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['especie'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar (idEspecie, descripcion, aplicaLSP, etc.)',
    },
];