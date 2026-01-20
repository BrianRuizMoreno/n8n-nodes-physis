import { INodeProperties } from 'n8n-workflow';

export const variedadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['variedad'] } },
        options: [
            { name: 'Obtener Por Código', value: 'get', description: 'GET Devuelve una variedad de cereal', action: 'Obtener por c digo a variedad',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva variedad', action: 'Crear a variedad',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una variedad existente', action: 'Actualizar a variedad',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una variedad', action: 'Eliminar a variedad',},
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
        description: 'Código identificador de la variedad',
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
        description: 'Cuerpo con los datos de la variedad (código, descripción, codCereal, etc.)',
    },
];