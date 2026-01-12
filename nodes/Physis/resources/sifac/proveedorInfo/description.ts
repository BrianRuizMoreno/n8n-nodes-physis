import { INodeProperties } from 'n8n-workflow';

export const proveedorInfoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['proveedorInfo'] } },
        options: [
            { name: 'Listar Conexiones Contables', value: 'getConexiones', description: 'GET Conexiones contables de proveedores.' },
            { name: 'Listar Condiciones de Pago', value: 'getCondicionesPago', description: 'GET Condiciones de pago disponibles.' },
            { name: 'Listar Topes de Crédito', value: 'getTopesCredito', description: 'GET Topes de crédito.' },
            { name: 'Listar Transportes', value: 'getTransportes', description: 'GET Transportes asociados.' },
            { name: 'Listar Compradores', value: 'getCompradores', description: 'GET Compradores asociados.' },
            { name: 'Listar Observaciones', value: 'getObservaciones', description: 'GET Observaciones configuradas.' },
        ],
        default: 'getConexiones',
    },
];

export const proveedorInfoFields: INodeProperties[] = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{"obtenerTambienSoloLectura": true}',
        displayOptions: { show: { service: ['sifac'], resource: ['proveedorInfo'] } },
        description: 'Opcional: { "obtenerTambienSoloLectura": boolean }',
    },
];