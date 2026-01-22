import { INodeProperties } from 'n8n-workflow';

export const tiposComprobantesAfipOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tiposComprobantesAfip'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Devuelve la lista de tipos de comprobantes AFIP configurados', 
                action: 'Listar todos a tipos comprobantes afip',
            },
            { 
                name: 'Obtener Detalle', 
                value: 'get', 
                description: 'GET Obtiene un tipo específico usando su clave compuesta (ID + IVA)' ,
                action: 'Obtener detalle a tipos comprobantes afip',
            },
            { 
                name: 'Crear Tipo', 
                value: 'create', 
                description: 'POST Crea una nueva configuración de comprobante AFIP', 
                action: 'Crear tipo a tipos comprobantes afip',
            },
            { 
                name: 'Modificar Tipo', 
                value: 'update', 
                description: 'PUT Actualiza un tipo existente', 
                action: 'Modificar tipo a tipos comprobantes afip',
            },
            { 
                name: 'Eliminar Tipo', 
                value: 'delete', 
                description: 'DELETE Elimina una configuración de comprobante AFIP', 
                action: 'Eliminar tipo a tipos comprobantes afip',
            },
        ],
        default: 'getAll',
    },
];

export const tiposComprobantesAfipFields: INodeProperties[] = [

    {
        displayName: 'ID Tipo Comprobante',
        name: 'idTipoComprobanteAfip',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobantesAfip'],
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código interno del comprobante (ej: "FAC-A")',
    },
    {
        displayName: 'Tipo IVA (Ámbito)',
        name: 'iva',
        type: 'options',
        options: [
            { name: 'Compras (C)', value: 'C' },
            { name: 'Ventas (V)', value: 'V' },
        ],
        default: 'V',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobantesAfip'],
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Define si el comprobante se usa en Compras o Ventas',
    },
    {
        displayName: 'Filtro Por Ámbito',
        name: 'ivaFilter',
        type: 'options',
        options: [
            { name: 'Todos', value: 'TODOS' },
            { name: 'Compras (C)', value: 'C' },
            { name: 'Ventas (V)', value: 'V' },
        ],
        default: 'TODOS',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobantesAfip'],
                operation: ['getAll'] 
            } 
        },
        description: 'Filtra la lista según si son de compra o venta',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tiposComprobantesAfip'],
                operation: ['create', 'update'] 
            } 
        },
        description: 'Objeto con la definición del comprobante (codigoAFIP, nombre, letra, etc.)',
    },
];