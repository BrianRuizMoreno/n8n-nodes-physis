import { INodeProperties } from 'n8n-workflow';

export const humedadOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['humedad'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista tabla de humedades de un cereal', action: 'Listar por cereal a humedad',},
            { name: 'Obtener Detalle', value: 'get', description: 'GET Obtiene merma por cereal y porcentaje', action: 'Obtener detalle a humedad',},
            { name: 'Crear (Lista)', value: 'create', description: 'POST Inserta una lista de humedades (Array)', action: 'Crear lista a humedad',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una humedad específica (Objeto)', action: 'Actualizar a humedad',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una humedad por ID interno', action: 'Eliminar a humedad',},
        ],
        default: 'getAll',
    },
];

export const humedadFields: INodeProperties[] = [

    {
        displayName: 'Cód Cereal',
        name: 'codCereal',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['humedad'], 
                operation: ['getAll', 'get'] 
            } 
        },
        description: 'Código del cereal',
    },
    {
        displayName: 'Porcentaje Humedad',
        name: 'porcHumedad',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['humedad'], 
                operation: ['get'] 
            } 
        },
        description: 'Valor del porcentaje de humedad para consultar',
    },
    {
        displayName: 'ID Humedad (Interno)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['humedad'], 
                operation: ['delete'] 
            } 
        },
        description: 'Identificador interno del registro de humedad',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '[]',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['humedad'],
                operation: ['create', 'update']
            } 
        },
        description: 'Array de objetos para Crear, Objeto simple para Actualizar',
    },
];