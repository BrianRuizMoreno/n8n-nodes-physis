"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saldoFields = exports.saldoOperations = void 0;
exports.saldoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['saldo'] } },
        options: [
            { name: 'Saldo Cuenta', value: 'getSaldo', description: 'GET Saldo estándar de cuenta', action: 'Saldo cuenta a saldo', },
            { name: 'Saldo Multimoneda', value: 'getSaldoMM', description: 'GET Saldo bimonetario', action: 'Saldo multimoneda a saldo', },
        ],
        default: 'getSaldo',
    },
];
exports.saldoFields = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['saldo'] } },
    },
];
//# sourceMappingURL=description.js.map