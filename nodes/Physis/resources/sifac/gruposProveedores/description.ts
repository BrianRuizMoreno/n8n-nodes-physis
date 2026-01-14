import { INodeProperties } from 'n8n-workflow';

export const grupoProveedoresOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['grupoProveedores'] } },
        options: [
            // --- FINANCIERO ---
            { 
                name: 'Cond. Pago: Listar', 
                value: 'getCondicionesPago', 
                description: 'GET Condiciones de pago habilitadas para el grupo.' 
            },
            { 
                name: 'Cond. Pago: Asignar', 
                value: 'updateCondicionesPago', 
                description: 'POST Restringe condiciones de pago. Body JSON requerido.' 
            },
            { 
                name: 'Topes Crédito: Listar', 
                value: 'getTopesCredito', 
                description: 'GET Topes de crédito habilitados.' 
            },
            { 
                name: 'Topes Crédito: Asignar', 
                value: 'updateTopesCredito', 
                description: 'POST Restringe topes de crédito.' 
            },
            { 
                name: 'Descuentos: Listar', 
                value: 'getDescuentos', 
                description: 'GET Descuentos habilitados.' 
            },
            { 
                name: 'Descuentos: Asignar', 
                value: 'updateDescuentos', 
                description: 'POST Restringe descuentos.' 
            },
            
            // --- LOGÍSTICA Y OTROS ---
            { 
                name: 'Transportes: Listar', 
                value: 'getTransportes', 
                description: 'GET Transportes habilitados.' 
            },
            { 
                name: 'Transportes: Asignar', 
                value: 'updateTransportes', 
                description: 'POST Restringe transportes.' 
            },
            { 
                name: 'Vendedores: Listar', 
                value: 'getVendedores', 
                description: 'GET Vendedores/Compradores habilitados.' 
            },
            { 
                name: 'Vendedores: Asignar', 
                value: 'updateVendedores', 
                description: 'POST Restringe vendedores/compradores.' 
            },
            { 
                name: 'Contabilidad: Listar', 
                value: 'getConexionesContables', 
                description: 'GET Conexiones contables habilitadas.' 
            },
            { 
                name: 'Contabilidad: Asignar', 
                value: 'updateConexionesContables', 
                description: 'POST Restringe conexiones contables.' 
            },
            { 
                name: 'Observaciones: Listar', 
                value: 'getObservaciones', 
                description: 'GET Observaciones predefinidas habilitadas.' 
            },
            { 
                name: 'Observaciones: Asignar', 
                value: 'updateObservaciones', 
                description: 'POST Restringe observaciones predefinidas.' 
            },
        ],
        default: 'getCondicionesPago',
    },
];

export const grupoProveedoresFields: INodeProperties[] = [
    {
        displayName: 'ID Grupo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['grupoProveedores'] 
            } 
        },
        description: 'Identificador numérico del Grupo de Usuarios (idGrupo).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['grupoProveedores'] 
            } 
        },
        description: 'Cuerpo para POST (Asignaciones) o Filtros para GET.',
    },
];