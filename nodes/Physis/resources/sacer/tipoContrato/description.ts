import { INodeProperties } from 'n8n-workflow';

export const tipoContratoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['tipoContrato'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Devuelve todos los tipos de contrato.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Devuelve un tipo de contrato específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de contrato.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de contrato existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de contrato.' },
        ],
        default: 'getAll',
    },
];

export const tipoContratoFields: INodeProperties[] = [
    {
        displayName: 'ID Tipo Contrato',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['tipoContrato'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador del tipo de contrato.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['tipoContrato'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos del tipo de contrato (código, descripción, sigla, aFijar, etc.).',
    },
];