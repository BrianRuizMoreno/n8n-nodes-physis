import { INodeProperties } from 'n8n-workflow';

export const variosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['varios'] } },
        options: [
            // --- CONCEPTOS ---
            { 
                name: 'Conceptos: Listar Todos', 
                value: 'getConceptos', 
                description: 'GET Obtiene el maestro de conceptos no stockeables',
                action: 'Conceptos: Listar Todos a varios',
            },
            // --- REPORTES ---
            { 
                name: 'Consultas: Terceros Dinámica', 
                value: 'consultaTerceros', 
                description: 'GET Ejecuta una consulta compleja sobre la vista de terceros (SQL-like vía JSON)',
                action: 'Consultas: Terceros Dinámica a varios',
            },
            // --- PERMISOS GRUPOS ---
            { 
                name: 'Grupos: Listar Cuentas Permitidas', 
                value: 'getGrupoCuentas', 
                description: 'GET Cuentas auxiliares específicas visibles por un grupo',
                action: 'Grupos: Listar Cuentas Permitidas a varios',
            },
            { 
                name: 'Grupos: Asignar Cuentas Permitidas', 
                value: 'updateGrupoCuentas', 
                description: 'POST Define qué cuentas específicas puede ver un grupo (Row Level Security)',
                action: 'Grupos: Asignar Cuentas Permitidas a varios',
            },
        ],
        default: 'getConceptos',
    },
];

export const variosFields: INodeProperties[] = [
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