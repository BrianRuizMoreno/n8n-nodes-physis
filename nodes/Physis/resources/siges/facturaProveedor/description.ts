import { INodeProperties } from 'n8n-workflow';

export const facturaProveedorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['facturaProveedor'] } },
        options: [
            { name: 'Procesar PDF (QR)', value: 'uploadPdf', description: 'POST Extrae datos de QR de factura.' },
            { name: 'Obtener Hash PDF', value: 'uploadPdfHash', description: 'POST Obtiene hash de archivo PDF.' },
            { name: 'Ingresar Autorizada', value: 'uploadAuthorized', description: 'POST Ingresa comprobante autorizado con imagen.' },
            { name: 'Verificar Existencia', value: 'checkExiste', description: 'GET Verifica si factura ya existe por CUIT/Punto/Numero.' },
        ],
        default: 'checkExiste',
    },
];

export const facturaProveedorFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['facturaProveedor'] } },
    },
];