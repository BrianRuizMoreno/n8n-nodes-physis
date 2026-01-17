import { INodeProperties } from 'n8n-workflow';

export const establecimientoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['establecimiento'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los establecimientos', action: 'Listar Todos an establecimiento',},
            { name: 'Listar Por Tercero', value: 'getByTercero', description: 'GET Lista establecimientos de un tercero específico', action: 'Listar por Tercero an establecimiento',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de un establecimiento específico', action: 'Obtener por ID an establecimiento',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo establecimiento', action: 'Crear an establecimiento',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un establecimiento existente', action: 'Actualizar an establecimiento',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un establecimiento', action: 'Eliminar an establecimiento',},
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
        description: 'Identificador numérico del establecimiento',
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
        description: 'Tipo de auxiliar (ej: 1 para Clientes)',
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
        description: 'Código de la cuenta auxiliar del tercero',
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
        description: 'Cuerpo con los datos del establecimiento (descripción, ubicación, tercero, etc.)',
    },
];