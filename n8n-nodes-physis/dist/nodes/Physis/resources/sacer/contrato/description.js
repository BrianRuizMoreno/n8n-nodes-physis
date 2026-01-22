"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contratoFields = exports.contratoOperations = void 0;
exports.contratoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['contrato'] } },
        options: [
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un contrato existente', action: 'Actualizar a contrato', },
            { name: 'Consulta Tabla', value: 'tableSearch', description: 'POST Búsqueda avanzada con paginado y orden', action: 'Consulta tabla a contrato', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo contrato', action: 'Crear a contrato', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un contrato por su ID interno', action: 'Eliminar a contrato', },
            { name: 'Get Many', value: 'getAll', description: 'GET Lista contratos con múltiples filtros', action: 'Listar todos a contrato', },
            { name: 'Listar Por Tercero', value: 'getByTercero', description: 'GET Contratos de un cliente/proveedor específico', action: 'Listar por tercero a contrato', },
            { name: 'Obtener Detalle', value: 'get', description: 'GET Obtiene un contrato por Campaña y Número', action: 'Obtener detalle a contrato', },
        ],
        default: 'getAll',
    },
];
exports.contratoFields = [
    {
        displayName: 'ID Contrato (Interno)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['contrato'],
                operation: ['delete']
            }
        },
        description: 'ID interno numérico del contrato para eliminación',
    },
    {
        displayName: 'Cód Campaña',
        name: 'codCampania',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['contrato'],
                operation: ['get']
            }
        },
        description: 'Código de la campaña del contrato',
    },
    {
        displayName: 'Nro Contrato',
        name: 'nroContrato',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['contrato'],
                operation: ['get']
            }
        },
        description: 'Número visible del contrato (string)',
    },
    {
        displayName: 'ID Auxiliar (idAuxi)',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['contrato'],
                operation: ['getByTercero']
            }
        },
        description: 'Tipo de auxiliar (ej: 1 para Clientes)',
    },
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['contrato'],
                operation: ['getByTercero']
            }
        },
        description: 'Código de la cuenta auxiliar',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['contrato']
            }
        },
        description: 'Cuerpo para Crear/Editar o Filtros para Listados (fechaDesde, codCereal, estadoContrato, etc)',
    },
];
//# sourceMappingURL=description.js.map