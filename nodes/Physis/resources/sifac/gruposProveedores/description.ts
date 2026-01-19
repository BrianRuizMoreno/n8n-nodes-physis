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
                description: 'GET Condiciones de pago habilitadas para el grupo',
                action: 'Cond. Pago: Listar a grupo proveedores',
            },
            { 
                name: 'Cond. Pago: Asignar', 
                value: 'updateCondicionesPago', 
                description: 'POST Restringe condiciones de pago. Body JSON requerido.',
                action: 'Cond. Pago: Asignar a grupo proveedores',
            },
            { 
                name: 'Topes Crédito: Listar', 
                value: 'getTopesCredito', 
                description: 'GET Topes de crédito habilitados',
                action: 'Topes Crédito: Listar a grupo proveedores',
            },
            { 
                name: 'Topes Crédito: Asignar', 
                value: 'updateTopesCredito', 
                description: 'POST Restringe topes de crédito',
                action: 'Topes Crédito: Asignar a grupo proveedores',
            },
            { 
                name: 'Descuentos: Listar', 
                value: 'getDescuentos', 
                description: 'GET Descuentos habilitados',
                action: 'Descuentos: Listar a grupo proveedores',
            },
            { 
                name: 'Descuentos: Asignar', 
                value: 'updateDescuentos', 
                description: 'POST Restringe descuentos',
                action: 'Descuentos: Asignar a grupo proveedores',
            },
            
            // --- LOGÍSTICA Y OTROS ---
            { 
                name: 'Transportes: Listar', 
                value: 'getTransportes', 
                description: 'GET Transportes habilitados',
                action: 'Transportes: Listar a grupo proveedores',
            },
            { 
                name: 'Transportes: Asignar', 
                value: 'updateTransportes', 
                description: 'POST Restringe transportes',
                action: 'Transportes: Asignar a grupo proveedores',
            },
            { 
                name: 'Vendedores: Listar', 
                value: 'getVendedores', 
                description: 'GET Vendedores/Compradores habilitados',
                action: 'Vendedores: Listar a grupo proveedores',
            },
            { 
                name: 'Vendedores: Asignar', 
                value: 'updateVendedores', 
                description: 'POST Restringe vendedores/compradores',
                action: 'Vendedores: Asignar a grupo proveedores',
            },
            { 
                name: 'Contabilidad: Listar', 
                value: 'getConexionesContables', 
                description: 'GET Conexiones contables habilitadas',
                action: 'Contabilidad: Listar a grupo proveedores',
            },
            { 
                name: 'Contabilidad: Asignar', 
                value: 'updateConexionesContables', 
                description: 'POST Restringe conexiones contables',
                action: 'Contabilidad: Asignar a grupo proveedores',
            },
            { 
                name: 'Observaciones: Listar', 
                value: 'getObservaciones', 
                description: 'GET Observaciones predefinidas habilitadas',
                action: 'Observaciones: Listar a grupo proveedores',
            },
            { 
                name: 'Observaciones: Asignar', 
                value: 'updateObservaciones', 
                description: 'POST Restringe observaciones predefinidas',
                action: 'Observaciones: Asignar a grupo proveedores',
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
        description: 'Identificador numérico del Grupo de Usuarios (idGrupo)',
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
        description: 'Cuerpo para POST (Asignaciones) o Filtros para GET',
    },
];