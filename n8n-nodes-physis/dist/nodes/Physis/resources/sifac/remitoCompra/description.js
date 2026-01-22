"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remitoCompraFields = exports.remitoCompraOperations = void 0;
exports.remitoCompraOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['remitoCompra'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista remitos. Filtros: { "fechaDesde": "YYYY-MM-DD", "top": 10 }.', action: 'Listar todos a remito compra', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de un remito de compra (idCabecera)', action: 'Obtener por ID a remito compra', },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo remito de compra', action: 'Crear a remito compra', },
        ],
        default: 'getAll',
    },
];
exports.remitoCompraFields = [
    {
        displayName: 'ID Remito (Cabecera)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['remitoCompra'],
                operation: ['get']
            }
        },
        description: 'Identificador único de la cabecera del remito',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['remitoCompra']
            }
        },
        description: 'Cuerpo para Crear o Filtros para Listar (ej: {"top": 50})',
    },
];
//# sourceMappingURL=description.js.map