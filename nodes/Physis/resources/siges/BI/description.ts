import { INodeProperties } from 'n8n-workflow';

export const biOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['bi'] } },
        options: [
            // --- TABLEROS ---
            { 
                name: 'Listar Tableros Disponibles', 
                value: 'listDashboards', 
                description: 'GET Devuelve los tableros de análisis multidimensional configurados.' 
            },
            { 
                name: 'Obtener Datos de Tablero', 
                value: 'getDashboardData', 
                description: 'GET Obtiene la configuración y datos de un tablero específico.' 
            },
            { 
                name: 'Crear Tablero', 
                value: 'createDashboard', 
                description: 'POST Configura un nuevo análisis multidimensional.' 
            },
            { 
                name: 'Actualizar Tablero', 
                value: 'updateDashboard', 
                description: 'PUT Modifica un análisis existente.' 
            },
            // --- UI / GRILLAS ---
            { 
                name: 'Obtener Configuración Grilla', 
                value: 'getGridConfig', 
                description: 'GET Recupera el estado guardado (columnas, orden) de una grilla AgGrid.' 
            },
            { 
                name: 'Guardar Configuración Grilla', 
                value: 'updateGridConfig', 
                description: 'PUT Guarda el estado visual de una grilla.' 
            },
        ],
        default: 'listDashboards',
    },
];

export const biFields: INodeProperties[] = [
    {
        displayName: 'Origen (Módulo)',
        name: 'origen',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi']
            } 
        },
        description: 'ID del módulo origen de datos (0=Todos).',
    },
    {
        displayName: 'ID Grupo',
        name: 'idGrupo',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['getDashboardData'] 
            } 
        },
        description: 'Grupo al que pertenece el tablero.',
    },
    {
        displayName: 'ID Tablero',
        name: 'idTablero',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['getDashboardData'] 
            } 
        },
        description: 'Identificador único del tablero.',
    },
    {
        displayName: 'Fecha Desde',
        name: 'fechaDesde',
        type: 'dateTime',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['getDashboardData'] 
            } 
        },
        description: 'Inicio del rango de análisis. Si se omite, suele ser 1 año atrás.',
    },
    {
        displayName: 'Fecha Hasta',
        name: 'fechaHasta',
        type: 'dateTime',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['getDashboardData'] 
            } 
        },
        description: 'Fin del rango de análisis.',
    },
    {
        displayName: 'Nombre Grilla',
        name: 'grillaName',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['getGridConfig', 'updateGridConfig'] 
            } 
        },
        description: 'Identificador de cadena de la grilla (ej: "frmComprobantes").',
    },
    {
        displayName: 'ID Usuario (Opcional)',
        name: 'idUsuario',
        type: 'number',
        default: 0,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['getGridConfig'] 
            } 
        },
        description: 'Filtrar configuración por usuario específico.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['bi'],
                operation: ['createDashboard', 'updateDashboard', 'updateGridConfig'] 
            } 
        },
        description: 'Configuración de columnas, gráficos o estado de la grilla.',
    },
];