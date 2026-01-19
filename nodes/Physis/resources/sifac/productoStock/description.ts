import { INodeProperties } from 'n8n-workflow';

export const productoStockOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['productoStock'] } },
        options: [

            { name: 'Consultar Stock (Producto)', value: 'getStock', description: 'GET Stock de un producto', action: 'Consultar Stock (Producto) a producto stock',},
            { name: 'Consultar Stock (Depósito)', value: 'getStockByDeposito', description: 'GET Stock por depósito y producto (filtros opcionales)', action: 'Consultar Stock (Depósito) a producto stock',},
            { name: 'Consultar Stock Disponible', value: 'getStockDisponible', description: 'GET Stock disponible detallado', action: 'Consultar Stock Disponible a producto stock',},
            { name: 'Consultar Saldos', value: 'getSaldos', description: 'GET Saldos con múltiples criterios', action: 'Consultar Saldos a producto stock',},
            { name: 'Consultar Pesos', value: 'getPesos', description: 'GET Pesos disponibles (piezas)', action: 'Consultar Pesos a producto stock',},
            { name: 'Historial Movimientos', value: 'getMovimientos', description: 'GET Historial de movimientos de un producto', action: 'Historial Movimientos a producto stock',},
            { name: 'Registrar Movimiento', value: 'createMovimiento', description: 'POST Alta de movimiento o stock inicial', action: 'Registrar Movimiento a producto stock',},
            { name: 'Actualizar Movimiento', value: 'updateMovimiento', description: 'PATCH Modificación parcial de movimiento', action: 'Actualizar Movimiento a producto stock',},
            { name: 'Firmar Movimiento', value: 'createFirma', description: 'POST Asocia una firma a un movimiento', action: 'Firmar Movimiento a producto stock',},
            { name: 'Buscar Productos (Simple)', value: 'search', description: 'GET Búsqueda por texto', action: 'Buscar Productos (Simple) a producto stock',},
            { name: 'Buscar Productos (Avanzado)', value: 'searchAdvanced', description: 'POST Consulta avanzada con filtros y orden', action: 'Buscar Productos (Avanzado) a producto stock',},
            { name: 'Árbol De Productos', value: 'getArbol', description: 'GET Estructura jerárquica', action: 'Árbol de Productos a producto stock',},
            { name: 'Configuración Producto', value: 'getSettings', description: 'GET Settings de un producto', action: 'Configuración Producto a producto stock',},
            { name: 'Bloquear Pieza', value: 'bloqueo', description: 'POST Bloquea un producto temporalmente', action: 'Bloquear Pieza a producto stock',},
            { name: 'Desbloquear Pieza', value: 'desbloqueo', description: 'POST Desbloquea un producto', action: 'Desbloquear Pieza a producto stock',},
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