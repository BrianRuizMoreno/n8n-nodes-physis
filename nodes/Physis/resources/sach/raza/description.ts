import { INodeProperties } from 'n8n-workflow';

export const razaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['raza'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista razas (filtro opcional por Especie).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene una raza específica.' },
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Lista jerárquica Especie -> Raza para Tree View.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva raza.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una raza existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una raza.' },
        ],
        default: 'getAll',
    },
];

export const razaFields: INodeProperties[] = [
    {
        displayName: 'ID Raza',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['raza'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico de la raza.',
    },
    {
        displayName: 'ID Especie',
        name: 'idEspecie',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['raza'], 
                operation: ['getAll', 'get', 'delete'] 
            } 
        },
        description: 'Filtro opcional. ID de la especie (ej: 1 para Bovinos).',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['raza'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos de la raza (descripción, especie, códigos AFIP, etc.).',
    },
];