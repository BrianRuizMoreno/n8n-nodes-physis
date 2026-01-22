"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afectacionFields = exports.afectacionOperations = void 0;
exports.afectacionOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['afectacion'] } },
        options: [
            {
                name: 'Listar Pendientes De Afectar',
                value: 'getPending',
                description: 'GET Busca comprobantes (facturas o pagos) que tienen saldo disponible para ser imputado',
                action: 'Listar pendientes de afectar an afectacion',
            },
            {
                name: 'Ver Detalle De Afectación',
                value: 'getAffectedDetails',
                description: 'GET Consulta cómo fue aplicado/imputado un comprobante específico',
                action: 'Ver detalle de afectaci n an afectacion',
            },
        ],
        default: 'getPending',
    },
];
exports.afectacionFields = [
    {
        displayName: 'ID / Número Comprobante',
        name: 'comprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['afectacion']
            }
        },
        description: 'Identificador o número del comprobante a consultar (ej: "0001-12345678")',
    },
    {
        displayName: 'Estado',
        name: 'estado',
        type: 'options',
        options: [
            { name: 'Todos', value: 0 },
            { name: 'Pendiente Total', value: 1 },
            { name: 'Pendiente Parcial', value: 2 },
            { name: 'Cancelado / Afectado', value: 3 },
        ],
        default: 1,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['afectacion']
            }
        },
        description: 'Filtra por el estado de imputación del documento',
    },
    {
        displayName: 'Signo (Debe/Haber)',
        name: 'signo',
        type: 'options',
        options: [
            { name: 'Positivo (Deudor/Cargo)', value: 1 },
            { name: 'Negativo (Acreedor/Abono)', value: -1 },
        ],
        default: 1,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['afectacion']
            }
        },
        description: 'Define si se buscan comprobantes que suman (Facturas) o restan (Recibos)',
    },
    {
        displayName: 'JSON Parámetros Adicionales',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['afectacion']
            }
        },
        description: 'Filtros extra soportados por la API',
    },
];
//# sourceMappingURL=description.js.map