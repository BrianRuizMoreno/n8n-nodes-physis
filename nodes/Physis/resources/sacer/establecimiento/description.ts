import { INodeProperties } from 'n8n-workflow';

export const establecimientoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['establecimiento'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los establecimientos.' },
            { name: 'Listar por Tercero', value: 'getByTercero', description: 'GET Lista establecimientos de un tercero específico.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de un establecimiento específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo establecimiento.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un establecimiento existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un establecimiento.' },
        ],
        default: 'getAll',
    },
];

export const establecimientoFields: INodeProperties[] = [
    {
        displayName: 'ID Establecimiento',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['establecimiento'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico del establecimiento.',
    },
    {
        displayName: 'ID Auxiliar (idAuxi)',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['establecimiento'], 
                operation: ['getByTercero'] 
            } 
        },
        description: 'Tipo de auxiliar (ej: 1 para Clientes).',
    },
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['establecimiento'], 
                operation: ['getByTercero'] 
            } 
        },
        description: 'Código de la cuenta auxiliar del tercero.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['establecimiento'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos del establecimiento (descripción, ubicación, tercero, etc.).',
    },
];