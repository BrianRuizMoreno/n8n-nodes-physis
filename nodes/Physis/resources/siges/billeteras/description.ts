import { INodeProperties } from 'n8n-workflow';

export const billeterasOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['billeteras'] } },
        options: [
            // --- CONSULTAS ---
            { 
                name: 'Listar Billeteras', 
                value: 'getAll', 
                description: 'GET Devuelve el listado de billeteras configuradas.' 
            },
            { 
                name: 'Obtener Billetera', 
                value: 'get', 
                description: 'GET Obtiene datos de una billetera específica por ID Auxiliar.' 
            },
            // --- SINCRONIZACIÓN ---
            { 
                name: 'Listar Movimientos Pendientes', 
                value: 'getPendingMovements', 
                description: 'GET Obtiene movimientos de Physis no informados a la billetera.' 
            },
            { 
                name: 'Actualizar Estado Movimiento', 
                value: 'updateMovementStatus', 
                description: 'PUT Marca un movimiento como informado o procesado.' 
            },
            // --- OPERACIONES ---
            { 
                name: 'Insertar Operación (QR)', 
                value: 'createOperation', 
                description: 'POST Ingresa una compra o transacción desde la Billetera a Physis.' 
            },
            { 
                name: 'Procesar Balance Diario', 
                value: 'processDailyBalance', 
                description: 'POST Procesa el resumen diario del banco para conciliación.' 
            },
            { 
                name: 'Refrescar Saldos', 
                value: 'refreshBalances', 
                description: 'POST Fuerza la actualización de saldos para cuentas con movimientos del día.' 
            },
        ],
        default: 'getAll',
    },
];

export const billeterasFields: INodeProperties[] = [

    {
        displayName: 'ID Auxiliar',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['billeteras'],
                operation: ['get'] 
            } 
        },
        description: 'ID del rubro de la billetera.',
    },
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['billeteras'],
                operation: ['get'] 
            } 
        },
        description: 'Código de la cuenta billetera.',
    },
    {
        displayName: 'ID Movimiento',
        name: 'idMov',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['billeteras'],
                operation: ['updateMovementStatus'] 
            } 
        },
        description: 'Identificador del movimiento a actualizar.',
    },
    {
        displayName: 'Posición / Acción',
        name: 'posicion',
        type: 'options',
        options: [
            { name: 'Cambiar Estado (0 a 1)', value: 1 },
            { name: 'Setear Fecha API (Enviado)', value: 2 },
            { name: 'Setear Fecha Banco (Confirmado)', value: 3 },
        ],
        default: 1,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['billeteras'],
                operation: ['updateMovementStatus'] 
            } 
        },
        description: 'Qué flag de sincronización actualizar.',
    },
    {
        displayName: 'JSON Body (Operaciones)',
        name: 'jsonBody',
        type: 'json',
        default: '[]',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['billeteras'],
                operation: ['createOperation', 'processDailyBalance'] 
            } 
        },
        description: 'Array de objetos con los movimientos a insertar (idMovimiento, operationGroupId, importe, etc).',
    },
];