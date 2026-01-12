import { INodeProperties } from 'n8n-workflow';

export const variedadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['variedad'] } },
        options: [
            { name: 'Obtener por Código', value: 'get', description: 'GET Devuelve una variedad de cereal.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva variedad.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una variedad existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una variedad.' },
        ],
        default: 'get',
    },
];

export const variedadFields: INodeProperties[] = [
    {
        displayName: 'Cód Variedad',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['variedad'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código identificador de la variedad.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['variedad'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos de la variedad (código, descripción, codCereal, etc.).',
    },
];