import { INodeProperties } from 'n8n-workflow';

export const especieOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['especie'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista todas las especies.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene una especie específica.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva especie.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una especie existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una especie.' },
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
        description: 'Identificador numérico de la especie.',
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
        description: 'Cuerpo para Crear/Actualizar (idEspecie, descripcion, aplicaLSP, etc.).',
    },
];