"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interdepositosFields = exports.interdepositosOperations = void 0;
exports.interdepositosOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['interdepositos'] } },
        options: [
            {
                name: 'Obtener Interdepósito',
                value: 'get',
                description: 'GET Devuelve los datos de un interdepósito específico por comprobante',
                action: 'Obtener interdep sito an interdepositos',
            },
            {
                name: 'Obtener Próximo ID',
                value: 'getNextId',
                description: 'GET Obtiene el siguiente número disponible para generar un interdepósito',
                action: 'Obtener pr ximo id an interdepositos',
            },
            {
                name: 'Listar Medios (Filtrado)',
                value: 'getMeans',
                description: 'GET Busca medios de interdepósito con filtro de exportable',
                action: 'Listar medios filtrado an interdepositos',
            },
            {
                name: 'Listar Medios (Todos)',
                value: 'getAllMeans',
                description: 'GET Busca todos los medios de interdepósito por código',
                action: 'Listar medios todos an interdepositos',
            },
            {
                name: 'Última Fecha Exportable',
                value: 'getLastExportDate',
                description: 'GET Devuelve la fecha del último depósito marcado como exportable',
                action: 'Ltima fecha exportable an interdepositos',
            },
            {
                name: 'Listar Números De Envío',
                value: 'getShipmentNumbers',
                description: 'GET Obtiene los números de envío registrados en una fecha específica',
                action: 'Listar n meros de env o an interdepositos',
            },
            {
                name: 'Buscar Por Fecha Y Envío',
                value: 'getByDateAndShipment',
                description: 'GET Recupera interdepósitos filtrando por fecha y número de lote/envío',
                action: 'Buscar por fecha y env o an interdepositos',
            },
        ],
        default: 'get',
    },
];
exports.interdepositosFields = [
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['interdepositos'],
                operation: ['get']
            }
        },
        description: 'Ejercicio contable del comprobante',
    },
    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['interdepositos'],
                operation: ['get']
            }
        },
        description: 'Identificador único del comprobante de interdepósito',
    },
    {
        displayName: 'Código Medio',
        name: 'codMedio',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['interdepositos'],
                operation: ['getMeans', 'getAllMeans']
            }
        },
        description: 'Código del medio o canal de depósito',
    },
    {
        displayName: 'Es Exportable',
        name: 'exportable',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['interdepositos'],
                operation: ['getMeans']
            }
        },
        description: 'Filtrar si el medio permite exportación de datos',
    },
    {
        displayName: 'Fecha',
        name: 'fecha',
        type: 'dateTime',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['interdepositos'],
                operation: ['getShipmentNumbers', 'getByDateAndShipment']
            }
        },
        description: 'Fecha del envío o depósito',
    },
    {
        displayName: 'Número De Envío',
        name: 'numeroEnvio',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['interdepositos'],
                operation: ['getByDateAndShipment']
            }
        },
        description: 'Número de lote o secuencia del envío',
    },
];
//# sourceMappingURL=description.js.map