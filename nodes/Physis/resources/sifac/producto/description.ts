import { INodeProperties } from 'n8n-workflow';

export const productoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['producto'] } },
        options: [

			{ name: 'Listar (Búsqueda)', value: 'getAll', description: 'GET Buscar por texto/código. Filtros: { "texto": "soja", "pageSize": 10 }.' },
            { name: 'Consulta Avanzada (Grid)', value: 'getConsultaGrid', description: 'POST Consulta compleja grid.' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol.' },
            { name: 'Obtener Configuración', value: 'getSettings', description: 'GET Settings de un producto (ID).' },
            { name: 'Stock: Por Depósito', value: 'getStock', description: 'GET Stock detallado por depósito para un producto.' },
            { name: 'Stock: Disponible', value: 'getStockDisponible', description: 'GET Stock disponible calculado.' },
            { name: 'Stock: Movimientos', value: 'getMovimientosStock', description: 'GET Historial de movimientos. Filtros: fechas, depósito.' },
            { name: 'Stock: Registrar Movimiento', value: 'createMovimientoStock', description: 'POST Alta de movimiento o producto en depósito.' },
            { name: 'Stock: Actualizar Movimiento', value: 'updateMovimientoStock', description: 'PATCH Actualiza parcialmente (ej: firma).' },
            { name: 'Precios: Consultar', value: 'getPrecios', description: 'GET Precios vigentes del producto.' },
            { name: 'Bloquear Pieza', value: 'blockProducto', description: 'POST Bloquea un producto/pieza temporalmente.' },
            { name: 'Desbloquear Pieza', value: 'unblockProducto', description: 'POST Desbloquea un producto/pieza.' },
        ],
        default: 'getAll',
    },
];

export const productoFields: INodeProperties[] = [
    {
        displayName: 'ID Producto',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['producto'], 
                operation: [
                    'getStock', 'getStockDisponible', 'getMovimientosStock',
                    'getPrecios', 'getSettings'
                ] 
            } 
        },
        description: 'Identificador único del producto (Código).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['producto'] 
            } 
        },
        description: 'Cuerpo para POST/PATCH o Filtros para GET (ej: {"texto": "maiz"}, {"idDeposito": "DEP01"}).',
    },
];