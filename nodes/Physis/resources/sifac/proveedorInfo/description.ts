import { INodeProperties } from 'n8n-workflow';

export const proveedorInfoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['proveedorInfo'] } },
        options: [
            { name: 'Listar Conexiones Contables', value: 'getConexiones', description: 'GET Conexiones contables de proveedores' 
																																																																											action: 'Listar Conexiones Contables a proveedor info',},
            { name: 'Listar Condiciones De Pago', value: 'getCondicionesPago', description: 'GET Condiciones de pago disponibles' 
																																																																															action: 'Listar Condiciones de Pago a proveedor info',},
            { name: 'Listar Topes De Crédito', value: 'getTopesCredito', description: 'GET Topes de crédito' 
																																																																									action: 'Listar Topes de Crédito a proveedor info',},
            { name: 'Listar Transportes', value: 'getTransportes', description: 'GET Transportes asociados' 
																																																																			action: 'Listar Transportes a proveedor info',},
            { name: 'Listar Compradores', value: 'getCompradores', description: 'GET Compradores asociados' 
																																																																			action: 'Listar Compradores a proveedor info',},
            { name: 'Listar Observaciones', value: 'getObservaciones', description: 'GET Observaciones configuradas' 
																																																																							action: 'Listar Observaciones a proveedor info',},
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