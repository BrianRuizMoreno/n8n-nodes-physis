"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imputacionIVAFields = exports.imputacionIVAOperations = void 0;
exports.imputacionIVAOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['imputacionIVA'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve el listado de imputaciones contables de IVA', action: 'Listar todas an imputacion iva', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve una imputación específica', action: 'Obtener por ID an imputacion IVA', },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva imputación de IVA', action: 'Crear an imputacion IVA', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una imputación existente', action: 'Actualizar an imputacion IVA', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una imputación de IVA', action: 'Eliminar an imputacion IVA', },
        ],
        default: 'getAll',
    },
];
exports.imputacionIVAFields = [
    {
        displayName: 'Cód Imputación (idIva)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['imputacionIVA'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador de la imputación (idIva)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['imputacionIVA'],
                operation: ['create', 'update']
            }
        },
        description: 'Cuerpo con los datos de la imputación (alícuotas, cuentas contables, descripción, etc.)',
    },
];
//# sourceMappingURL=description.js.map