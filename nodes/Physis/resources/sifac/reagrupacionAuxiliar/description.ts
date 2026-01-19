import { INodeProperties } from 'n8n-workflow';

export const reagrupacionAuxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['reagrupacionAuxiliar'] } },
        options: [
            { name: 'Obtener Default', value: 'getDefault', description: 'GET Reagrupaciones por defecto de un tercero', action: 'Obtener Default a reagrupacion auxiliar',},
        ],
        default: 'getDefault',
    },
];

export const reagrupacionAuxiliarFields: INodeProperties[] = [
    {
        displayName: 'ID Auxi',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['reagrupacionAuxiliar'] } },
    },
    {
        displayName: 'ID Cta Auxi',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sifac'], resource: ['reagrupacionAuxiliar'] } },
    },
];