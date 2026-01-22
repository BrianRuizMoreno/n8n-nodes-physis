"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indicadorFields = exports.indicadorOperations = void 0;
exports.indicadorOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['indicador'] } },
        options: [
            { name: 'Tasa Default', value: 'getTasaDefault', description: 'GET Última tasa moneda funcional', action: 'Tasa default an indicador', },
            { name: 'Tasa Serie', value: 'getTasaSerie', description: 'GET Tasa de indicador específico', action: 'Tasa serie an indicador', },
            { name: 'Guardar Tasa', value: 'setTasa', description: 'POST Inserta o actualiza tasa', action: 'Guardar tasa an indicador', },
        ],
        default: 'getTasaDefault',
    },
];
exports.indicadorFields = [
    {
        displayName: 'ID Indicador',
        name: 'idIndicador',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'], operation: ['getTasaSerie', 'setTasa'] } },
    },
    {
        displayName: 'ID Serie',
        name: 'idSerie',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'], operation: ['getTasaSerie', 'setTasa'] } },
    },
    {
        displayName: 'Valor Tasa',
        name: 'tasa',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'], operation: ['setTasa'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'] } },
    },
];
//# sourceMappingURL=description.js.map