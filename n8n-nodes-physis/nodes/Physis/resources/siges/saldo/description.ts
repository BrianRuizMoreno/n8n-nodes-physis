import { INodeProperties } from 'n8n-workflow';

export const saldoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['saldo'] } },
        options: [
            { name: 'Saldo Cuenta', value: 'getSaldo', description: 'GET Saldo estándar de cuenta', action: 'Saldo cuenta a saldo',},
            { name: 'Saldo Multimoneda', value: 'getSaldoMM', description: 'GET Saldo bimonetario', action: 'Saldo multimoneda a saldo',},
        ],
        default: 'getSaldo',
    },
];

export const saldoFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['saldo'] } },
    },
];