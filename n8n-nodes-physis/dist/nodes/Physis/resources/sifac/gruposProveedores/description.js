"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grupoProveedoresFields = exports.grupoProveedoresOperations = void 0;
exports.grupoProveedoresOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['grupoProveedores'] } },
        options: [
            {
                name: 'Cond. Pago: Listar',
                value: 'getCondicionesPago',
                description: 'GET Condiciones de pago habilitadas para el grupo',
                action: 'Cond pago listar a grupo proveedores',
            },
            {
                name: 'Cond. Pago: Asignar',
                value: 'updateCondicionesPago',
                description: 'POST Restringe condiciones de pago. Body JSON requerido.',
                action: 'Cond pago asignar a grupo proveedores',
            },
            {
                name: 'Topes Crédito: Listar',
                value: 'getTopesCredito',
                description: 'GET Topes de crédito habilitados',
                action: 'Topes cr dito listar a grupo proveedores',
            },
            {
                name: 'Topes Crédito: Asignar',
                value: 'updateTopesCredito',
                description: 'POST Restringe topes de crédito',
                action: 'Topes cr dito asignar a grupo proveedores',
            },
            {
                name: 'Descuentos: Listar',
                value: 'getDescuentos',
                description: 'GET Descuentos habilitados',
                action: 'Descuentos listar a grupo proveedores',
            },
            {
                name: 'Descuentos: Asignar',
                value: 'updateDescuentos',
                description: 'POST Restringe descuentos',
                action: 'Descuentos asignar a grupo proveedores',
            },
            {
                name: 'Transportes: Listar',
                value: 'getTransportes',
                description: 'GET Transportes habilitados',
                action: 'Transportes listar a grupo proveedores',
            },
            {
                name: 'Transportes: Asignar',
                value: 'updateTransportes',
                description: 'POST Restringe transportes',
                action: 'Transportes asignar a grupo proveedores',
            },
            {
                name: 'Vendedores: Listar',
                value: 'getVendedores',
                description: 'GET Vendedores/Compradores habilitados',
                action: 'Vendedores listar a grupo proveedores',
            },
            {
                name: 'Vendedores: Asignar',
                value: 'updateVendedores',
                description: 'POST Restringe vendedores/compradores',
                action: 'Vendedores asignar a grupo proveedores',
            },
            {
                name: 'Contabilidad: Listar',
                value: 'getConexionesContables',
                description: 'GET Conexiones contables habilitadas',
                action: 'Contabilidad listar a grupo proveedores',
            },
            {
                name: 'Contabilidad: Asignar',
                value: 'updateConexionesContables',
                description: 'POST Restringe conexiones contables',
                action: 'Contabilidad asignar a grupo proveedores',
            },
            {
                name: 'Observaciones: Listar',
                value: 'getObservaciones',
                description: 'GET Observaciones predefinidas habilitadas',
                action: 'Observaciones listar a grupo proveedores',
            },
            {
                name: 'Observaciones: Asignar',
                value: 'updateObservaciones',
                description: 'POST Restringe observaciones predefinidas',
                action: 'Observaciones asignar a grupo proveedores',
            },
        ],
        default: 'getCondicionesPago',
    },
];
exports.grupoProveedoresFields = [
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
//# sourceMappingURL=description.js.map