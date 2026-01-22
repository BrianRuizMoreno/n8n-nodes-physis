"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valoresFields = exports.valoresOperations = void 0;
exports.valoresOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['valores'] } },
        options: [
            {
                name: 'Verificar Disponibilidad',
                value: 'checkAvailability',
                description: 'GET Consulta si un valor (cheque) está en cartera disponible',
                action: 'Verificar disponibilidad a valores',
            },
            {
                name: 'Verificar Negociado',
                value: 'checkNegotiated',
                description: 'GET Consulta si un valor ya fue entregado o negociado',
                action: 'Verificar negociado a valores',
            },
            {
                name: 'Último Nro Cheque',
                value: 'getLastCheckNumber',
                description: 'GET Obtiene el último número emitido de una chequera específica',
                action: 'Ltimo nro cheque a valores',
            },
            {
                name: 'Listar Valores Recibidos',
                value: 'getReceivedValues',
                description: 'GET Devuelve la lista de cheques/valores asociados a un recibo',
                action: 'Listar valores recibidos a valores',
            },
            {
                name: 'Listar Envíos Electrónicos',
                value: 'getElectronicBatches',
                description: 'GET Consulta lotes de E-Cheqs enviados al banco',
                action: 'Listar env os electr nicos a valores',
            },
        ],
        default: 'getReceivedValues',
    },
];
exports.valoresFields = [
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['checkAvailability', 'checkNegotiated', 'getReceivedValues']
            }
        },
        description: 'Año contable',
    },
    {
        displayName: 'ID Comprobante (Cabecera)',
        name: 'idComprobante',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['checkAvailability', 'checkNegotiated', 'getReceivedValues']
            }
        },
        description: 'Identificador del comprobante que contiene los valores',
    },
    {
        displayName: 'ID Banco (Código)',
        name: 'idBanco',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['getLastCheckNumber', 'getElectronicBatches']
            }
        },
        description: 'Código del banco (ej: "011" Galicia, "072" Santander)',
    },
    {
        displayName: 'ID Cuenta Bancaria',
        name: 'idCuentaBancaria',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['getLastCheckNumber', 'getElectronicBatches']
            }
        },
    },
    {
        displayName: 'ID Chequera',
        name: 'idChequera',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['getLastCheckNumber']
            }
        },
    },
    {
        displayName: 'Es Entrega',
        name: 'entrega',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['getReceivedValues']
            }
        },
        description: 'Si es true busca valores entregados, si es false busca recibidos',
    },
    {
        displayName: 'Es Electrónico',
        name: 'electronico',
        type: 'options',
        options: [
            { name: 'Todos', value: 0 },
            { name: 'Físico', value: 1 },
            { name: 'E-Cheq', value: 2 },
        ],
        default: 0,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['getReceivedValues']
            }
        },
    },
    {
        displayName: 'Tipo Consulta',
        name: 'tipoConsulta',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['valores'],
                operation: ['getElectronicBatches']
            }
        },
        description: 'Código de filtro para el banco (ej: "ENVIADOS", "PENDIENTES")',
    },
];
//# sourceMappingURL=description.js.map