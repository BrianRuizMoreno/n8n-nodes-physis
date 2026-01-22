"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reporteDefinibleFields = exports.reporteDefinibleOperations = void 0;
exports.reporteDefinibleOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reporteDefinible'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista reportes definibles', action: 'Listar reportes a reporte definible', },
            { name: 'Descargar PDF', value: 'getPdf', description: 'GET Genera y descarga PDF de reporte', action: 'Descargar PDF a reporte definible', },
            { name: 'Obtener Resumen', value: 'getResumen', description: 'GET Resumen de reporte generado', action: 'Obtener resumen a reporte definible', },
        ],
        default: 'getAll',
    },
];
exports.reporteDefinibleFields = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['reporteDefinible'] } },
        description: 'Filtros (IdDefinido, idtipoformato, idformato, etc)',
    },
];
//# sourceMappingURL=description.js.map