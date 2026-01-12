import { INodeProperties } from 'n8n-workflow';

export const clienteInfoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['clienteInfo'] } },
        options: [
            { name: 'Listar Conexiones Contables', value: 'getConexiones', description: 'GET Conexiones contables disponibles.' },
            { name: 'Listar Condiciones de Pago', value: 'getCondicionesPago', description: 'GET Condiciones de pago disponibles.' },
            { name: 'Listar Descuentos (1)', value: 'getDescuentos', description: 'GET Lista de descuentos principales.' },
            { name: 'Listar Descuentos (2)', value: 'getDescuentos2', description: 'GET Lista de segundos descuentos.' },
            { name: 'Listar Listas de Precios', value: 'getListasPrecios', description: 'GET Listas de precios asignables.' },
            { name: 'Listar Topes de Crédito', value: 'getTopesCredito', description: 'GET Topes de crédito configurados.' },
            { name: 'Listar Zonas', value: 'getZonas', description: 'GET Zonas de clientes.' },
            { name: 'Listar Condiciones de Venta', value: 'getCondicionesVenta', description: 'GET Condiciones de venta.' },
            { name: 'Listar Transportes', value: 'getTransportes', description: 'GET Transportes asignables.' },
            { name: 'Listar Distribuidores', value: 'getDistribuidores', description: 'GET Distribuidores.' },
            { name: 'Listar Vendedores', value: 'getVendedores', description: 'GET Vendedores.' },
            { name: 'Listar Observaciones', value: 'getObservaciones', description: 'GET Observaciones predefinidas.' },
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
        description: 'Opcional. Configuración de filtros.\nEj: { "obtenerTambienSoloLectura": false }',
    },
];