"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proveedorInfoFields = exports.proveedorInfoOperations = void 0;
exports.proveedorInfoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['proveedorInfo'] } },
        options: [
            { name: 'Listar Conexiones Contables', value: 'getConexiones', description: 'GET Conexiones contables de proveedores', action: 'Listar conexiones contables a proveedor info', },
            { name: 'Listar Condiciones De Pago', value: 'getCondicionesPago', description: 'GET Condiciones de pago disponibles', action: 'Listar condiciones de pago a proveedor info', },
            { name: 'Listar Topes De Crédito', value: 'getTopesCredito', description: 'GET Topes de crédito', action: 'Listar topes de cr dito a proveedor info', },
            { name: 'Listar Transportes', value: 'getTransportes', description: 'GET Transportes asociados', action: 'Listar transportes a proveedor info', },
            { name: 'Listar Compradores', value: 'getCompradores', description: 'GET Compradores asociados', action: 'Listar compradores a proveedor info', },
            { name: 'Listar Observaciones', value: 'getObservaciones', description: 'GET Observaciones configuradas', action: 'Listar observaciones a proveedor info', },
        ],
        default: 'getConexiones',
    },
];
exports.proveedorInfoFields = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{"obtenerTambienSoloLectura": true}',
        displayOptions: { show: { service: ['sifac'], resource: ['proveedorInfo'] } },
        description: 'Opcional: { "obtenerTambienSoloLectura": boolean }',
    },
];
//# sourceMappingURL=description.js.map