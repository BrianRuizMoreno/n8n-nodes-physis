import { INodeProperties } from 'n8n-workflow';

export const formaPagoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['formaPago'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve el listado de formas de pago', action: 'Listar todas a forma pago',},
            { name: 'Obtener Por Código', value: 'get', description: 'GET Devuelve una forma de pago específica', action: 'Obtener por c digo a forma pago',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva forma de pago', action: 'Crear a forma pago',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una forma de pago existente', action: 'Actualizar a forma pago',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una forma de pago', action: 'Eliminar a forma pago',},
        ],
        default: 'getAll',
    },
];

export const formaPagoFields: INodeProperties[] = [
    {
        displayName: 'Cód Forma Pago',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['formaPago'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador de la forma de pago',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['formaPago'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos de la forma de pago (descripción, días, cuotas, etc.)',
    },
];