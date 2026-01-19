import { INodeProperties } from 'n8n-workflow';

export const clienteInfoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['clienteInfo'] } },
        options: [
            { name: 'Listar Conexiones Contables', value: 'getConexiones', description: 'GET Conexiones contables disponibles', action: 'Listar Conexiones Contables a cliente info',},
            { name: 'Listar Condiciones De Pago', value: 'getCondicionesPago', description: 'GET Condiciones de pago disponibles', action: 'Listar Condiciones de Pago a cliente info',},
            { name: 'Listar Descuentos (1)', value: 'getDescuentos', description: 'GET Lista de descuentos principales', action: 'Listar Descuentos (1) a cliente info',},
            { name: 'Listar Descuentos (2)', value: 'getDescuentos2', description: 'GET Lista de segundos descuentos', action: 'Listar Descuentos (2) a cliente info',},
            { name: 'Listar Listas De Precios', value: 'getListasPrecios', description: 'GET Listas de precios asignables', action: 'Listar Listas de Precios a cliente info',},
            { name: 'Listar Topes De Crédito', value: 'getTopesCredito', description: 'GET Topes de crédito configurados', action: 'Listar Topes de Crédito a cliente info',},
            { name: 'Listar Zonas', value: 'getZonas', description: 'GET Zonas de clientes', action: 'Listar Zonas a cliente info',},
            { name: 'Listar Condiciones De Venta', value: 'getCondicionesVenta', description: 'GET Condiciones de venta', action: 'Listar Condiciones de Venta a cliente info',},
            { name: 'Listar Transportes', value: 'getTransportes', description: 'GET Transportes asignables', action: 'Listar Transportes a cliente info',},
            { name: 'Listar Distribuidores', value: 'getDistribuidores', description: 'GET Distribuidores', action: 'Listar Distribuidores a cliente info',},
            { name: 'Listar Vendedores', value: 'getVendedores', description: 'GET Vendedores', action: 'Listar Vendedores a cliente info',},
            { name: 'Listar Observaciones', value: 'getObservaciones', description: 'GET Observaciones predefinidas', action: 'Listar Observaciones a cliente info',},
        ],
        default: 'getCondicionesPago',
    },
];

export const clienteInfoFields: INodeProperties[] = [
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