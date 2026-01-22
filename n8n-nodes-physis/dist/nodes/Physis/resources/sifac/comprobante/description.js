"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobanteSifacFields = exports.comprobanteSifacOperations = void 0;
exports.comprobanteSifacOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['comprobante'] } },
        options: [
            { name: 'Listar Cabeceras', value: 'getCabeceras', description: 'GET Listado ligero. Filtros: fechaDesde, fechaHasta, subSistema.', action: 'Listar cabeceras a comprobante', },
            { name: 'Consulta Avanzada (Grid)', value: 'getConsultaGrid', description: 'POST Consulta compleja con paginado y filtros', action: 'Consulta avanzada grid a comprobante', },
            { name: 'Crear Comprobante', value: 'create', description: 'POST Registra un nuevo comprobante completo', action: 'Crear comprobante a comprobante', },
            { name: 'Autorización: Consultar', value: 'getAutorizacionGrid', description: 'POST Consulta ítems para autorización', action: 'Autorizaci n consultar a comprobante', },
            { name: 'Autorización: Actualizar', value: 'authorizeItem', description: 'PATCH Autoriza/Desautoriza un ítem específico', action: 'Autorizaci n actualizar a comprobante', },
        ],
        default: 'getCabeceras',
    },
];
exports.comprobanteSifacFields = [
    {
        displayName: 'ID Cabecera',
        name: 'idCabecera',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['comprobante'],
                operation: ['authorizeItem']
            }
        },
        description: 'Identificador de la cabecera del comprobante',
    },
    {
        displayName: 'ID Movimiento',
        name: 'idMovimiento',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['comprobante'],
                operation: ['authorizeItem']
            }
        },
        description: 'Identificador del movimiento/ítem a autorizar',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['comprobante']
            }
        },
        description: 'Para Listar: Filtros Query (fechaDesde). Para Consultas/Crear: Objeto JSON completo. Para Autorizar: { "autoriza": true }.',
    },
];
//# sourceMappingURL=description.js.map