"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terceroFields = exports.terceroOperations = void 0;
exports.terceroOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tercero'] } },
        options: [
            {
                name: 'Buscar (Autocomplete)',
                value: 'search',
                description: 'GET Busca terceros por nombre, código o documento',
                action: 'Buscar autocomplete a tercero',
            },
            {
                name: 'Obtener Detalle',
                value: 'get',
                description: 'GET Recupera los datos completos de un tercero específico',
                action: 'Obtener detalle a tercero',
            },
            {
                name: 'Buscar Por Documento',
                value: 'getByDocument',
                description: 'GET Busca terceros coincidentes por CUIT o DNI',
                action: 'Buscar por documento a tercero',
            },
            {
                name: 'Consulta Avanzada',
                value: 'query',
                description: 'POST Ejecuta una consulta con filtros complejos, ordenamiento y paginación',
                action: 'Consulta avanzada a tercero',
            },
            {
                name: 'Listar Domicilios',
                value: 'getAddresses',
                description: 'GET Obtiene las direcciones registradas de un tercero',
                action: 'Listar domicilios a tercero',
            },
            {
                name: 'Crear Domicilio',
                value: 'createAddress',
                description: 'POST Agrega una nueva dirección a un tercero',
                action: 'Crear domicilio a tercero',
            },
            {
                name: 'Listar Cuentas Bancarias',
                value: 'getBankAccounts',
                description: 'GET Devuelve las cuentas bancarias asociadas para transferencias',
                action: 'Listar cuentas bancarias a tercero',
            },
            {
                name: 'Listar Contactos',
                value: 'getContacts',
                description: 'GET Obtiene la lista de personas de contacto',
                action: 'Listar contactos a tercero',
            },
        ],
        default: 'search',
    },
];
exports.terceroFields = [
    {
        displayName: 'ID Plan Auxiliar',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tercero'],
                operation: ['get', 'getAddresses', 'createAddress']
            }
        },
        description: 'Identificador del rubro (ej: 100=Clientes)',
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
                resource: ['tercero'],
                operation: ['get', 'getAddresses', 'createAddress']
            }
        },
        description: 'Código del tercero (ej: "CLI-001")',
    },
    {
        displayName: 'Texto De Búsqueda',
        name: 'texto',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tercero'],
                operation: ['search']
            }
        },
        description: 'Nombre, razón social o parte del documento a buscar',
    },
    {
        displayName: 'Filtro ID Plan (Opcional)',
        name: 'idAuxiFilter',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tercero'],
                operation: ['search']
            }
        },
        description: 'Restringe la búsqueda a un solo rubro (ej: Solo buscar en Clientes)',
    },
    {
        displayName: 'Número De Documento',
        name: 'nroDoc',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tercero'],
                operation: ['getByDocument']
            }
        },
        description: 'CUIT o DNI exacto a buscar',
    },
    {
        displayName: 'JSON Parámetros / Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tercero']
            }
        },
        description: 'Filtros adicionales, datos del domicilio o estructura de consulta avanzada',
    },
];
//# sourceMappingURL=description.js.map