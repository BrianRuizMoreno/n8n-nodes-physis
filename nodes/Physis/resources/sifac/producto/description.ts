import { INodeProperties } from 'n8n-workflow';

export const productoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['producto'] } },
        options: [
            // --- CATÁLOGO Y BÚSQUEDA ---
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Búsqueda por texto. Filtros JSON: { "texto": "soja", "idDeposito": "CENTRAL", "soloDatosBasicos": true }.', 
                action: 'Listar (Búsqueda Rápida) a producto',
            },
            { 
                name: 'Consulta Avanzada (Grid)', 
                value: 'getConsultaGrid', 
                description: 'POST Consulta compleja. Body JSON: { "padre": "100", "colExistencia": true, "listaPrecio": "MAY" }.', 
                action: 'Consulta Avanzada (Grid) a producto',
            },
            { 
                name: 'Listar Árbol', 
                value: 'getArbol', 
                description: 'GET Estructura jerárquica. Filtros JSON: { "cuentaPadre": "100", "imputables": true }.', 
                action: 'Listar Árbol a producto',
            },
            { 
                name: 'Obtener Estructura', 
                value: 'getEstructura', 
                description: 'GET Metadatos y estructura de la tabla de productos', 
                action: 'Obtener Estructura a producto',
            },

            // --- STOCK Y EXISTENCIAS ---
            { 
                name: 'Stock: Saldos Detallados', 
                value: 'getSaldos', 
                description: 'GET Stock desglosado (Partidas, Lotes). Filtros JSON: { "idDeposito": "...", "conPartidas": true }.', 
                action: 'Stock: Saldos Detallados a producto',
            },
            { 
                name: 'Stock: Disponible Simple', 
                value: 'getStockDisponible', 
                description: 'GET Stock disponible (Liviano). Filtros JSON: { "idDeposito": "..." }.', 
                action: 'Stock: Disponible Simple a producto',
            },
            { 
                name: 'Stock: Piezas/Pesos', 
                value: 'getPesos', 
                description: 'GET Existencia de piezas pesables. Filtros JSON: { "pesoDesde": 10, "pesoHasta": 20 }.', 
                action: 'Stock: Piezas/Pesos a producto',
            },

            // --- PRECIOS ---
            { 
                name: 'Precios: Consultar por Producto', 
                value: 'getPrecios', 
                description: 'GET Precios vigentes del producto en listas. Filtros JSON: { "todasLasVigencias": true }.', 
                action: 'Precios: Consultar por Producto a producto',
            },
            { 
                name: 'Precios: Informe Precios y Stock', 
                value: 'getPreciosExistencia', 
                description: 'GET Reporte combinado. Filtros JSON: { "idLista": "...", "idDeposito": "..." }.', 
                action: 'Precios: Informe Precios y Stock a producto',
            },
            { 
                name: 'Precios: Actualizar Masivamente', 
                value: 'updatePrecios', 
                description: 'POST Modificar precios de un producto. Body JSON: Array de objetos precio.', 
                action: 'Precios: Actualizar Masivamente a producto',
            },

            // --- UTILIDADES ---
            { 
                name: 'Obtener Configuración', 
                value: 'getSettings', 
                description: 'GET Settings de un producto (ID)', 
                action: 'Obtener Configuración a producto',
            },
            { 
                name: 'Bloquear Pieza', 
                value: 'blockProducto', 
                description: 'POST Bloquea un producto/pieza temporalmente. Body JSON: { "codigoPieza": "...", "minutos": 5 }.',
                action: 'Bloquear Pieza a producto',
            },
            { 
                name: 'Desbloquear Pieza', 
                value: 'unblockProducto', 
                description: 'POST Desbloquea un producto/pieza',
                action: 'Desbloquear Pieza a producto',
            },
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
                    'getSaldos', 
                    'getStockDisponible', 
                    'getPesos',
                    'getPrecios', 
                    'updatePrecios',
                    'getSettings'
                ] 
            } 
        },
        description: 'Identificador único del producto (Código)',
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
        description: 'Cuerpo para POST (Body) o Filtros para GET (Query String). Consulte la descripción de la operación.',
    },
];