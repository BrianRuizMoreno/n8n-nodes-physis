"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variosFields = exports.variosOperations = void 0;
exports.variosOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['varios'] } },
        options: [
            {
                name: 'Conceptos: Listar Todos',
                value: 'getConceptos',
                description: 'GET Obtiene el maestro de conceptos no stockeables',
                action: 'Conceptos listar todos a varios',
            },
            {
                name: 'Consultas: Terceros Dinámica',
                value: 'consultaTerceros',
                description: 'GET Ejecuta una consulta compleja sobre la vista de terceros (SQL-like vía JSON)',
                action: 'Consultas terceros din mica a varios',
            },
            {
                name: 'Grupos: Listar Cuentas Permitidas',
                value: 'getGrupoCuentas',
                description: 'GET Cuentas auxiliares específicas visibles por un grupo',
                action: 'Grupos listar cuentas permitidas a varios',
            },
            {
                name: 'Grupos: Asignar Cuentas Permitidas',
                value: 'updateGrupoCuentas',
                description: 'POST Define qué cuentas específicas puede ver un grupo (Row Level Security)',
                action: 'Grupos asignar cuentas permitidas a varios',
            },
        ],
        default: 'getConceptos',
    },
];
exports.variosFields = [
    {
        displayName: 'ID Grupo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['varios'],
                operation: ['getGrupoCuentas', 'updateGrupoCuentas']
            }
        },
        description: 'Identificador del Grupo de Usuarios',
    },
    {
        displayName: 'Tipo De Auxiliar (idAuxi)',
        name: 'idAuxi',
        type: 'number',
        default: 1,
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['varios'],
                operation: ['getGrupoCuentas', 'updateGrupoCuentas']
            }
        },
        description: '1 = Clientes, 2 = Proveedores',
    },
    {
        displayName: 'JSON Body / Filtros / Consulta',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['varios']
            }
        },
        description: 'Estructura variable según la operación. Ver documentación.',
    },
];
//# sourceMappingURL=description.js.map