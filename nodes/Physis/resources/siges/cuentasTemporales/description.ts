import { INodeProperties } from 'n8n-workflow';

export const cuentasTempOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentasTemp'] } },
        options: [
            { 
                name: 'Iniciar/Limpiar Selección', 
                value: 'clean', 
                description: 'GET Inicializa una sesión temporal o limpia la existente',
                action: 'Iniciar/Limpiar Selección a cuentas temp',
            },
            { 
                name: 'Seleccionar Cuentas Principales', 
                value: 'insertPrincipal', 
                description: 'GET Agrega cuentas contables principales a la selección temporal',
                action: 'Seleccionar Cuentas Principales a cuentas temp',
            },
            { 
                name: 'Seleccionar Auxiliares (Terceros)', 
                value: 'insertAuxiliary', 
                description: 'GET Agrega clientes/proveedores específicos a la selección',
                action: 'Seleccionar Auxiliares (Terceros) a cuentas temp',
            },
            { 
                name: 'Seleccionar Todos Los Auxiliares', 
                value: 'insertAllAuxiliary', 
                description: 'GET Agrega masivamente todos los terceros de un plan',
                action: 'Seleccionar Todos los Auxiliares a cuentas temp',
            },
            { 
                name: 'Seleccionar Reagrupación Principal', 
                value: 'insertRegroupingPrincipal', 
                description: 'GET Agrega centros de costo o rubros principales',
                action: 'Seleccionar Reagrupación Principal a cuentas temp',
            },
            { 
                name: 'Seleccionar Reagrupación Auxiliar', 
                value: 'insertRegroupingAuxiliary', 
                description: 'GET Agrega rubros de terceros (ej: Zonas, Actividades)',
                action: 'Seleccionar Reagrupación Auxiliar a cuentas temp',
            },
        ],
        default: 'clean',
    },
];

export const cuentasTempFields: INodeProperties[] = [

    {
        displayName: 'ID Conexión (Sesión)',
        name: 'idConexion',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasTemp']
            } 
        },
        description: 'Identificador de la sesión temporal. Use 0 para generar uno nuevo en la primera llamada, y reutilice el número devuelto en las siguientes.',
    },
    {
        displayName: 'Lista De Cuentas (CSV)',
        name: 'cuentas',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasTemp'],
                operation: ['insertPrincipal', 'insertAuxiliary', 'insertRegroupingPrincipal', 'insertRegroupingAuxiliary'] 
            } 
        },
        description: 'Códigos separados por coma. Ejemplo: "1.1.01, 1.1.02" o "CLI-001, CLI-002".',
    },
    {
        displayName: 'ID Plan Auxiliar',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasTemp'],
                operation: ['insertAuxiliary', 'insertAllAuxiliary', 'insertRegroupingAuxiliary'] 
            } 
        },
        description: 'ID del plan de terceros (ej: 100=Clientes, 200=Proveedores)',
    },
    {
        displayName: 'ID Reagrupación Principal',
        name: 'idReagPpal',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasTemp'],
                operation: ['insertRegroupingPrincipal'] 
            } 
        },
        description: 'ID del plan de centro de costos o reagrupación contable',
    },
    {
        displayName: 'ID Reagrupación Auxiliar',
        name: 'idReagAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasTemp'],
                operation: ['insertRegroupingAuxiliary'] 
            } 
        },
        description: 'ID del plan de reagrupación de terceros (ej: Zonas)',
    },
];