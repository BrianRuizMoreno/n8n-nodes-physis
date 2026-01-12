import { INodeProperties } from 'n8n-workflow';

export const productoStockOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['productoStock'] } },
        options: [

            { name: 'Consultar Stock (Producto)', value: 'getStock', description: 'GET Stock de un producto.' },
            { name: 'Consultar Stock (Depósito)', value: 'getStockByDeposito', description: 'GET Stock por depósito y producto (filtros opcionales).' },
            { name: 'Consultar Stock Disponible', value: 'getStockDisponible', description: 'GET Stock disponible detallado.' },
            { name: 'Consultar Saldos', value: 'getSaldos', description: 'GET Saldos con múltiples criterios.' },
            { name: 'Consultar Pesos', value: 'getPesos', description: 'GET Pesos disponibles (piezas).' },
            { name: 'Historial Movimientos', value: 'getMovimientos', description: 'GET Historial de movimientos de un producto.' },
            { name: 'Registrar Movimiento', value: 'createMovimiento', description: 'POST Alta de movimiento o stock inicial.' },
            { name: 'Actualizar Movimiento', value: 'updateMovimiento', description: 'PATCH Modificación parcial de movimiento.' },
            { name: 'Firmar Movimiento', value: 'createFirma', description: 'POST Asocia una firma a un movimiento.' },
            { name: 'Buscar Productos (Simple)', value: 'search', description: 'GET Búsqueda por texto.' },
            { name: 'Buscar Productos (Avanzado)', value: 'searchAdvanced', description: 'POST Consulta avanzada con filtros y orden.' },
            { name: 'Árbol de Productos', value: 'getArbol', description: 'GET Estructura jerárquica.' },
            { name: 'Configuración Producto', value: 'getSettings', description: 'GET Settings de un producto.' },
            { name: 'Bloquear Pieza', value: 'bloqueo', description: 'POST Bloquea un producto temporalmente.' },
            { name: 'Desbloquear Pieza', value: 'desbloqueo', description: 'POST Desbloquea un producto.' },
        ],
        default: 'search',
    },
];

export const productoStockFields: INodeProperties[] = [
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
        description: 'Identificador del producto.',
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
        description: 'Cuerpo para POST/PATCH o Query Params para GET (ej: texto, offset, limit, fechas).',
    },
];