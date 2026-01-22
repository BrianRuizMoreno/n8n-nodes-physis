"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.origenDestinoFields = exports.origenDestinoOperations = void 0;
exports.origenDestinoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['origenDestino'] } },
        options: [
            { name: 'Obtener Sugeridos', value: 'getSugeridos', description: 'GET Origen y Destino sugeridos', action: 'Obtener sugeridos an origen destino', },
        ],
        default: 'getSugeridos',
    },
];
exports.origenDestinoFields = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['origenDestino'] } },
        description: 'Ej: { "idTipoComprobante": "PED", "deposito": "01", "idAuxi": 123 }',
    },
];
//# sourceMappingURL=description.js.map