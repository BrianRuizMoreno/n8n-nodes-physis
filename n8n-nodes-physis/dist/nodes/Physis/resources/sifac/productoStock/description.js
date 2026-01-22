"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoStockFields = exports.productoStockOperations = void 0;
exports.productoStockOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['productoStock'] } },
        options: [
            { name: 'Consultar Stock (Producto)', value: 'getStock', description: 'GET Stock de un producto', action: 'Consultar stock producto a producto stock', },
            { name: 'Consultar Stock (Depósito)', value: 'getStockByDeposito', description: 'GET Stock por depósito y producto (filtros opcionales)', action: 'Consultar stock dep sito a producto stock', },
            { name: 'Consultar Stock Disponible', value: 'getStockDisponible', description: 'GET Stock disponible detallado', action: 'Consultar stock disponible a producto stock', },
            { name: 'Consultar Saldos', value: 'getSaldos', description: 'GET Saldos con múltiples criterios', action: 'Consultar saldos a producto stock', },
            { name: 'Consultar Pesos', value: 'getPesos', description: 'GET Pesos disponibles (piezas)', action: 'Consultar pesos a producto stock', },
            { name: 'Historial Movimientos', value: 'getMovimientos', description: 'GET Historial de movimientos de un producto', action: 'Historial movimientos a producto stock', },
            { name: 'Registrar Movimiento', value: 'createMovimiento', description: 'POST Alta de movimiento o stock inicial', action: 'Registrar movimiento a producto stock', },
            { name: 'Actualizar Movimiento', value: 'updateMovimiento', description: 'PATCH Modificación parcial de movimiento', action: 'Actualizar movimiento a producto stock', },
            { name: 'Firmar Movimiento', value: 'createFirma', description: 'POST Asocia una firma a un movimiento', action: 'Firmar movimiento a producto stock', },
            { name: 'Buscar Productos (Simple)', value: 'search', description: 'GET Búsqueda por texto', action: 'Buscar productos simple a producto stock', },
            { name: 'Buscar Productos (Avanzado)', value: 'searchAdvanced', description: 'POST Consulta avanzada con filtros y orden', action: 'Buscar productos avanzado a producto stock', },
            { name: 'Árbol De Productos', value: 'getArbol', description: 'GET Estructura jerárquica', action: 'Rbol de productos a producto stock', },
            { name: 'Configuración Producto', value: 'getSettings', description: 'GET Settings de un producto', action: 'Configuraci n producto a producto stock', },
            { name: 'Bloquear Pieza', value: 'bloqueo', description: 'POST Bloquea un producto temporalmente', action: 'Bloquear pieza a producto stock', },
            { name: 'Desbloquear Pieza', value: 'desbloqueo', description: 'POST Desbloquea un producto', action: 'Desbloquear pieza a producto stock', },
        ],
        default: 'search',
    },
];
exports.productoStockFields = [
    {
        displayName: 'ID Producto',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: { service: ['sifac'], resource: ['productoStock'] },
            hide: { operation: ['createMovimiento', 'updateMovimiento', 'search', 'searchAdvanced', 'getArbol', 'getStockByDeposito', 'bloqueo', 'desbloqueo', 'createFirma'] }
        },
        description: 'Identificador del producto',
    },
    {
        displayName: 'ID Depósito',
        name: 'idDeposito',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['sifac'], resource: ['productoStock'], operation: ['getStockByDeposito'] } },
        description: 'Opcional. Identificador del depósito.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['productoStock'] } },
        description: 'Cuerpo para POST/PATCH o Query Params para GET (ej: texto, offset, limit, fechas)',
    },
];
//# sourceMappingURL=description.js.map