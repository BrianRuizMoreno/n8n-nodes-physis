"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajusteFields = exports.ajusteOperations = void 0;
exports.ajusteOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['ajuste'] } },
        options: [
            { name: 'Buscar Ajustes', value: 'search', description: 'GET Lista ajustes con múltiples filtros', action: 'Buscar ajustes an ajuste', },
            { name: 'Buscar Cuentas Principales', value: 'getCuentas', description: 'GET Cuentas contables para ajustes', action: 'Buscar cuentas principales an ajuste', },
            { name: 'Tipos Comprobante (Financiero)', value: 'getTiposFinanciero', description: 'GET Tipos de comprobante financiero', action: 'Tipos comprobante financiero an ajuste', },
            { name: 'Tipos Comprobante (Físico/Monetario)', value: 'getTiposFisicoMonetario', description: 'GET Tipos de comprobante físico o monetario', action: 'Tipos comprobante f sico monetario an ajuste', },
            { name: 'Gastos (Financiero)', value: 'getGastosFinanciero', description: 'GET Lista gastos financieros posibles', action: 'Gastos financiero an ajuste', },
            { name: 'Gastos (Físico/Monetario)', value: 'getGastosFisicoMonetario', description: 'GET Lista gastos físicos/monetarios posibles', action: 'Gastos f sico monetario an ajuste', },
            { name: 'Tributos (Financiero)', value: 'getTributosFinanciero', description: 'GET Lista tributos financieros', action: 'Tributos financiero an ajuste', },
            { name: 'Consultar Financiero', value: 'getFinanciero', description: 'GET Detalle de un ajuste financiero', action: 'Consultar financiero an ajuste', },
            { name: 'Consultar Físico', value: 'getFisico', description: 'GET Detalle de un ajuste físico', action: 'Consultar f sico an ajuste', },
            { name: 'Emitir Financiero', value: 'createFinanciero', description: 'POST Emite o Pre-emite un ajuste financiero', action: 'Emitir financiero an ajuste', },
            { name: 'Emitir Físico/Monetario (Pre)', value: 'emitirFisicoMonetario', description: 'GET Pre-emisión de ajuste físico/monetario', action: 'Emitir f sico monetario pre an ajuste', },
            { name: 'Emitir Físico/Monetario (Final)', value: 'emitirFinalFisicoMonetario', description: 'GET Emisión final de ajuste físico/monetario', action: 'Emitir f sico monetario final an ajuste', },
            { name: 'Obtener Comprobante Temp', value: 'getComprobanteTemp', description: 'GET Obtiene datos de comprobante temporal', action: 'Obtener comprobante temp an ajuste', },
            { name: 'Grabar Gastos Temp', value: 'saveGastosTemp', description: 'POST Graba gastos y vencimientos temporales', action: 'Grabar gastos temp an ajuste', },
        ],
        default: 'search',
    },
];
exports.ajusteFields = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['ajuste']
            }
        },
        description: 'Parámetros de consulta (idComprobante, fechas, tipo) o Cuerpo para emisión',
    },
];
//# sourceMappingURL=description.js.map