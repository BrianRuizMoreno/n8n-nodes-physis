"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contratoFields = exports.contratoOperations = void 0;
exports.contratoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['contrato'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista contratos con filtros opcionales', action: 'Listar contratos a contrato', },
            { name: 'Obtener Contrato', value: 'get', description: 'GET Obtiene un contrato específico por Número y Campaña', action: 'Obtener contrato a contrato', },
            { name: 'Crear/Actualizar Contrato', value: 'create', description: 'POST Inserta o modifica un contrato', action: 'Crear actualizar contrato a contrato', },
            { name: 'Listar Contratos Terceros', value: 'getContratosTerceros', description: 'GET Lista contratos de terceros', action: 'Listar contratos terceros a contrato', },
            { name: 'Listar Corredores', value: 'getCorredores', description: 'GET Lista de corredores disponibles', action: 'Listar corredores a contrato', },
            { name: 'Listar Entregadores', value: 'getEntregadores', description: 'GET Lista de entregadores', action: 'Listar entregadores a contrato', },
            { name: 'Listar Transportistas', value: 'getTransportistas', description: 'GET Lista de transportistas', action: 'Listar transportistas a contrato', },
            { name: 'Listar Terceros', value: 'getTerceros', description: 'GET Lista de terceros genéricos', action: 'Listar terceros a contrato', },
            { name: 'Listar Monedas', value: 'getMonedas', description: 'GET Lista de monedas', action: 'Listar monedas a contrato', },
        ],
        default: 'getAll',
    },
];
exports.contratoFields = [
    {
        displayName: 'Cód. Campaña',
        name: 'codCampania',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['contrato'],
                operation: ['get']
            }
        },
        description: 'Código de la campaña del contrato',
    },
    {
        displayName: 'Nro. Contrato',
        name: 'nroContrato',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['contrato'],
                operation: ['get']
            }
        },
        description: 'Número identificador del contrato',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['contrato']
            },
            hide: {
                operation: ['get']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros Query String.\n' +
            'Ej. Listar: { "idCorredor": 1, "idCereal": 5, "contrato": "..." }\n' +
            'Ej. Maestros: { "filtro": "parte del nombre" }',
    },
];
//# sourceMappingURL=description.js.map