import { INodeProperties } from 'n8n-workflow';

export const tiposComprobanteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tiposComprobante'] } },
        options: [
            // --- CRUD ---
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Devuelve el catálogo de documentos disponibles', 
                action: 'Listar Todos a tipos comprobante',
            },
            { 
                name: 'Obtener Detalle', 
                value: 'get', 
                description: 'GET Recupera la configuración completa de un tipo de comprobante', 
                action: 'Obtener Detalle a tipos comprobante',
            },
            { 
                name: 'Crear Tipo', 
                value: 'create', 
                description: 'POST Configura un nuevo documento en el sistema', 
                action: 'Crear Tipo a tipos comprobante',
            },
            { 
                name: 'Modificar Tipo', 
                value: 'update', 
                description: 'PUT Actualiza reglas de negocio de un documento', 
                action: 'Modificar Tipo a tipos comprobante',
            },
            { 
                name: 'Eliminar Tipo', 
                value: 'delete', 
                description: 'DELETE Elimina un tipo de comprobante', 
                action: 'Eliminar Tipo a tipos comprobante',
            },
            // --- UTILIDADES ---
            { 
                name: 'Obtener Numeradores', 
                value: 'getNumerators', 
                description: 'GET Devuelve los talonarios/puntos de venta asociados a un documento' ,
                action: 'Obtener Numeradores a tipos comprobante',
            },
            { 
                name: 'Listar Por Afectación (Debe/Haber)', 
                value: 'getByAffectation', 
                description: 'GET Filtra comprobantes según si suman o restan en la cuenta corriente' ,
                action: 'Listar por Afectación (Debe/Haber) a tipos comprobante',
            },
            { 
                name: 'Listar Por IVA (Compra/Venta)', 
                value: 'getByIVA', 
                description: 'GET Filtra comprobantes según su libro de IVA asociado' ,
                action: 'Listar por IVA (Compra/Venta) a tipos comprobante',
            },
            { 
                name: 'Listar Clases', 
                value: 'getClasses', 
                description: 'GET Devuelve subtipos o clases para un módulo específico' ,
                action: 'Listar Clases a tipos comprobante',
            },
        ],
        default: 'getAll',
    },
];

export const tiposComprobanteFields: INodeProperties[] = [

    {
        displayName: 'ID Tipo Comprobante',
        name: 'idTipoComprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['get', 'delete', 'getNumerators'] 
            } 
        },
        description: 'Código interno del documento (ej: FAC, REM, OP)',
    },
    {
        displayName: 'Usar Endpoint "All"',
        name: 'useAllEndpoint',
        type: 'boolean',
        default: false,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['getAll'] 
            } 
        },
        description: 'Si es true, trae todos los registros sin filtrar. Si es false, aplica filtros de vigencia y modelo.',
    },
    {
        displayName: 'Fecha Vigencia',
        name: 'fechaVigencia',
        type: 'dateTime',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['getAll', 'getByAffectation'] 
            } 
        },
    },
    {
        displayName: 'Afectación (0/1)',
        name: 'afectacion',
        type: 'number',
        default: 0,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['getByAffectation'] 
            } 
        },
        description: '0: Debe (Cargos), 1: Haber (Descargos)',
    },
    {
        displayName: 'Tipo IVA (C/V)',
        name: 'tipoIva',
        type: 'options',
        options: [
            { name: 'Compras', value: 'C' },
            { name: 'Ventas', value: 'V' },
        ],
        default: 'V',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['getByIVA'] 
            } 
        },
    },
    {
        displayName: 'ID Plan Principal',
        name: 'idPpal',
        type: 'number',
        default: 1,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['getByAffectation', 'getByIVA'] 
            } 
        },
    },
    {
        displayName: 'Origen (Módulo)',
        name: 'origen',
        type: 'number',
        default: 0,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['getClasses'] 
            } 
        },
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobante'],
                operation: ['create', 'update'] 
            } 
        },
        description: 'Configuración completa del documento (nombre, signo, afectaStock, etc.)',
    },
];