"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuentaCorrienteGranosFields = exports.cuentaCorrienteGranosOperations = void 0;
exports.cuentaCorrienteGranosOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['cuentaCorrienteGranos'] } },
        options: [
            { name: 'Listar Movimientos', value: 'getMovimientos', description: 'GET Devuelve el listado detallado de movimientos', action: 'Listar movimientos a cuenta corriente granos', },
            { name: 'Obtener Totales', value: 'getTotales', description: 'GET Devuelve los totales acumulados de la cuenta', action: 'Obtener totales a cuenta corriente granos', },
            { name: 'Informe De Totales', value: 'getInformeTotales', description: 'GET Devuelve un informe estructurado de totales', action: 'Informe de totales a cuenta corriente granos', },
        ],
        default: 'getMovimientos',
    },
];
exports.cuentaCorrienteGranosFields = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['cuentaCorrienteGranos']
            }
        },
        description: 'Parámetros de consulta: idAuxi, idCtaAuxi, fechaDesde, fechaHasta, codCampania, codCereal, codPlanta, nroContrato, etc',
    },
];
//# sourceMappingURL=description.js.map