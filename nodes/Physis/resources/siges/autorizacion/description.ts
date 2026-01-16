import { INodeProperties } from 'n8n-workflow';

export const autorizacionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['autorizacion'] } },
        options: [
            { name: 'Listar Autorizantes', value: 'getAll', description: 'GET Lista todos los autorizantes del sistema.' },
            { name: 'Pases Pendientes', value: 'getPasesPendientes', description: 'GET Pases financieros pendientes.' },
            { name: 'Actualizar Pase (Patch)', value: 'updatePase', description: 'PATCH Autorizar/Desautorizar pase.' },
            { name: 'Actualizar Pase (Put)', value: 'updatePasePut', description: 'PUT Para afectar/desafectar.' },
            { name: 'Listar Pases Afectables', value: 'getAfectaciones', description: 'POST Lista pases disponibles para afectar.' },
            { name: 'Pases Ref. Sin Afectar', value: 'getSinAfectar', description: 'GET Pases referenciados pendientes.' },
        ],
        default: 'getAll',
    },
];

export const autorizacionFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['autorizacion'] } },
    },
];