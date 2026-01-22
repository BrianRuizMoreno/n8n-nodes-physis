"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenCompraInterfazFields = exports.ordenCompraInterfazOperations = void 0;
exports.ordenCompraInterfazOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['ordenCompraInterfaz'] } },
        options: [
            { name: 'Obtener Cabecera', value: 'getCabecera', description: 'GET Datos de cabecera de OC', action: 'Obtener cabecera an orden compra interfaz', },
            { name: 'Obtener Detalle', value: 'getDetalle', description: 'GET Items de una OC', action: 'Obtener detalle an orden compra interfaz', },
            { name: 'Consultar Listado', value: 'getConsulta', description: 'GET Listado de OCs por fecha', action: 'Consultar listado an orden compra interfaz', },
        ],
        default: 'getConsulta',
    },
];
exports.ordenCompraInterfazFields = [
    {
        displayName: 'Parámetros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['ordenCompraInterfaz'] } },
        description: 'Ej: { "idCabecera": 123 } o { "fecha": "2023-01-01" }',
    },
];
//# sourceMappingURL=description.js.map