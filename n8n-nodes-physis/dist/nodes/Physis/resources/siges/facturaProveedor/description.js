"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturaProveedorFields = exports.facturaProveedorOperations = void 0;
exports.facturaProveedorOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['facturaProveedor'] } },
        options: [
            { name: 'Procesar PDF (QR)', value: 'uploadPdf', description: 'POST Extrae datos de QR de factura', action: 'Procesar PDF (QR) a factura proveedor', },
            { name: 'Obtener Hash PDF', value: 'uploadPdfHash', description: 'POST Obtiene hash de archivo PDF', action: 'Obtener hash pdf a factura proveedor', },
            { name: 'Ingresar Autorizada', value: 'uploadAuthorized', description: 'POST Ingresa comprobante autorizado con imagen', action: 'Ingresar autorizada a factura proveedor', },
            { name: 'Verificar Existencia', value: 'checkExiste', description: 'GET Verifica si factura ya existe por CUIT/Punto/Numero', action: 'Verificar existencia a factura proveedor', },
        ],
        default: 'checkExiste',
    },
];
exports.facturaProveedorFields = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['facturaProveedor'] } },
    },
];
//# sourceMappingURL=description.js.map