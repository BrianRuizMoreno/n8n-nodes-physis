"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteInfoFields = exports.clienteInfoOperations = void 0;
exports.clienteInfoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['clienteInfo'] } },
        options: [
            { name: 'Listar Conexiones Contables', value: 'getConexiones', description: 'GET Conexiones contables disponibles', action: 'Listar conexiones contables a cliente info', },
            { name: 'Listar Condiciones De Pago', value: 'getCondicionesPago', description: 'GET Condiciones de pago disponibles', action: 'Listar condiciones de pago a cliente info', },
            { name: 'Listar Descuentos (1)', value: 'getDescuentos', description: 'GET Lista de descuentos principales', action: 'Listar descuentos 1 a cliente info', },
            { name: 'Listar Descuentos (2)', value: 'getDescuentos2', description: 'GET Lista de segundos descuentos', action: 'Listar descuentos 2 a cliente info', },
            { name: 'Listar Listas De Precios', value: 'getListasPrecios', description: 'GET Listas de precios asignables', action: 'Listar listas de precios a cliente info', },
            { name: 'Listar Topes De Crédito', value: 'getTopesCredito', description: 'GET Topes de crédito configurados', action: 'Listar topes de cr dito a cliente info', },
            { name: 'Listar Zonas', value: 'getZonas', description: 'GET Zonas de clientes', action: 'Listar zonas a cliente info', },
            { name: 'Listar Condiciones De Venta', value: 'getCondicionesVenta', description: 'GET Condiciones de venta', action: 'Listar condiciones de venta a cliente info', },
            { name: 'Listar Transportes', value: 'getTransportes', description: 'GET Transportes asignables', action: 'Listar transportes a cliente info', },
            { name: 'Listar Distribuidores', value: 'getDistribuidores', description: 'GET Distribuidores', action: 'Listar distribuidores a cliente info', },
            { name: 'Listar Vendedores', value: 'getVendedores', description: 'GET Vendedores', action: 'Listar vendedores a cliente info', },
            { name: 'Listar Observaciones', value: 'getObservaciones', description: 'GET Observaciones predefinidas', action: 'Listar observaciones a cliente info', },
        ],
        default: 'getCondicionesPago',
    },
];
exports.clienteInfoFields = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{"obtenerTambienSoloLectura": true}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['clienteInfo']
            }
        },
        description: 'Opcional. Configuración de filtros. Ej: { "obtenerTambienSoloLectura": false }.',
    },
];
//# sourceMappingURL=description.js.map