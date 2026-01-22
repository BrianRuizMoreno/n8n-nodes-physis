"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reagrupacionAuxiliarFields = exports.reagrupacionAuxiliarOperations = void 0;
exports.reagrupacionAuxiliarOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['reagrupacionAuxiliar'] } },
        options: [
            { name: 'Obtener Default', value: 'getDefault', description: 'GET Reagrupaciones por defecto de un tercero', action: 'Obtener default a reagrupacion auxiliar', },
        ],
        default: 'getDefault',
    },
];
exports.reagrupacionAuxiliarFields = [
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
//# sourceMappingURL=description.js.map