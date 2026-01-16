import { INodeProperties } from 'n8n-workflow';

export const terceroOperations: INodeProperties[] = [
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
                description: 'GET Busca terceros por nombre, código o documento.' 
            },
            { 
                name: 'Obtener Detalle', 
                value: 'get', 
                description: 'GET Recupera los datos completos de un tercero específico.' 
            },
            { 
                name: 'Buscar por Documento', 
                value: 'getByDocument', 
                description: 'GET Busca terceros coincidentes por CUIT o DNI.' 
            },
            { 
                name: 'Consulta Avanzada', 
                value: 'query', 
                description: 'POST Ejecuta una consulta con filtros complejos, ordenamiento y paginación.' 
            },
            { 
                name: 'Listar Domicilios', 
                value: 'getAddresses', 
                description: 'GET Obtiene las direcciones registradas de un tercero.' 
            },
            { 
                name: 'Crear Domicilio', 
                value: 'createAddress', 
                description: 'POST Agrega una nueva dirección a un tercero.' 
            },
            { 
                name: 'Listar Cuentas Bancarias', 
                value: 'getBankAccounts', 
                description: 'GET Devuelve las cuentas bancarias asociadas para transferencias.' 
            },
            { 
                name: 'Listar Contactos', 
                value: 'getContacts', 
                description: 'GET Obtiene la lista de personas de contacto.' 
            },
        ],
        default: 'search',
    },
];

export const terceroFields: INodeProperties[] = [

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
        description: 'Identificador del rubro (ej: 100=Clientes).',
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
        description: 'Código del tercero (ej: "CLI-001").',
    },
    {
        displayName: 'Texto de Búsqueda',
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
        description: 'Nombre, razón social o parte del documento a buscar.',
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
        description: 'Restringe la búsqueda a un solo rubro (ej: Solo buscar en Clientes).',
    },
    {
        displayName: 'Número de Documento',
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
        description: 'CUIT o DNI exacto a buscar.',
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
        description: 'Filtros adicionales, datos del domicilio o estructura de consulta avanzada.',
    },
];