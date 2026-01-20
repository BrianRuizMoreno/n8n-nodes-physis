import { INodeProperties } from 'n8n-workflow';

export const autorizacionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['autorizacion'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los autorizantes del sistema', action: 'Listar Autorizantes an autorizacion',},
            { name: 'Pases Pendientes', value: 'getPasesPendientes', description: 'GET Pases financieros pendientes', action: 'Pases Pendientes an autorizacion',},
            { name: 'Actualizar Pase (Patch)', value: 'updatePase', description: 'PATCH Autorizar/Desautorizar pase', action: 'Actualizar Pase (Patch) an autorizacion',},
            { name: 'Actualizar Pase (Put)', value: 'updatePasePut', description: 'PUT Para afectar/desafectar', action: 'Actualizar Pase (Put) an autorizacion',},
            { name: 'Listar Pases Afectables', value: 'getAfectaciones', description: 'POST Lista pases disponibles para afectar', action: 'Listar Pases Afectables an autorizacion',},
            { name: 'Pases Ref. Sin Afectar', value: 'getSinAfectar', description: 'GET Pases referenciados pendientes', action: 'Pases Ref. Sin Afectar an autorizacion',},
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