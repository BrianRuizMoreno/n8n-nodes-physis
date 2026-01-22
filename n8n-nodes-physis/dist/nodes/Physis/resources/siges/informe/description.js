"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.informeFields = exports.informeOperations = void 0;
exports.informeOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['informe'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista facturas/prefacturas. Filtros en JSON.', action: 'Listar informes an informe', },
            { name: 'PDF Valores', value: 'getPdfValores', description: 'GET Genera PDF de valores de un comprobante', action: 'PDF Valores an informe', },
            { name: 'PDF Afectaciones', value: 'getPdfAfectaciones', description: 'GET Genera PDF de afectaciones de un comprobante', action: 'PDF Afectaciones an informe', },
            { name: 'Resumen De Cuenta', value: 'getResumenCuenta', description: 'GET Resumen de cuenta corriente. Req: idAuxi, idCtaAuxi.', action: 'Resumen de cuenta an informe', },
            { name: 'Detalle Afectación', value: 'getDetalleAfectacion', description: 'GET Detalle de afectación de un comprobante (ID)', action: 'Detalle afectaci n an informe', },
            { name: 'Info Comercial', value: 'getInfoComercial', description: 'GET Información comercial de cliente (Consignatario)', action: 'Info comercial an informe', },
            { name: 'Composición Saldos', value: 'getComposicionSaldos', description: 'GET Composición de saldos detallada', action: 'Composici n saldos an informe', },
            { name: 'Composición Saldos (Reagrupados)', value: 'getComposicionSaldosReagrupados', description: 'GET Composición de saldos reagrupada', action: 'Composici n saldos reagrupados an informe', },
        ],
        default: 'getAll',
    },
];
exports.informeFields = [
    {
        displayName: 'ID Comprobante',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['informe'],
                operation: ['getDetalleAfectacion']
            }
        },
        description: 'Identificador del comprobante para ver detalle de afectación',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{\n  "fechaDesde": "2024-01-01",\n  "fechaHasta": "2024-12-31"\n}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['informe']
            }
        },
        description: 'Filtros de reporte (fechas, idAuxi, idCtaAuxi, idEjercicio, etc.)',
    },
];
//# sourceMappingURL=description.js.map