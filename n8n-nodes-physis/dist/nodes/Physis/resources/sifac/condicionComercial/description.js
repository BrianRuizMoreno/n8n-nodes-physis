"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condicionComercialFields = exports.condicionComercialOperations = void 0;
exports.condicionComercialOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['condicionComercial'] } },
        options: [
            { name: 'Pagos: Listar Árbol', value: 'getPagoArbol', action: 'Pagos listar rbol a condicion comercial', },
            { name: 'Pagos: Obtener', value: 'getPago', action: 'Pagos obtener a condicion comercial', },
            { name: 'Pagos: Vencimientos Manuales', value: 'getPagoManuales', action: 'Pagos vencimientos manuales a condicion comercial', },
            { name: 'Pagos: Crear', value: 'createPago', action: 'Pagos crear a condicion comercial', },
            { name: 'Pagos: Actualizar', value: 'updatePago', action: 'Pagos actualizar a condicion comercial', },
            { name: 'Pagos: Eliminar', value: 'deletePago', action: 'Pagos eliminar a condicion comercial', },
            { name: 'Desc: Listar Árbol', value: 'getDescuentoArbol', action: 'Desc listar rbol a condicion comercial', },
            { name: 'Desc: Obtener', value: 'getDescuento', action: 'Desc obtener a condicion comercial', },
            { name: 'Desc: Obtener por Alias', value: 'getDescuentoByAlias', action: 'Desc obtener por alias a condicion comercial', },
            { name: 'Desc: Crear', value: 'createDescuento', action: 'Desc crear a condicion comercial', },
            { name: 'Desc: Actualizar', value: 'updateDescuento', action: 'Desc actualizar a condicion comercial', },
            { name: 'Desc: Eliminar', value: 'deleteDescuento', action: 'Desc eliminar a condicion comercial', },
            { name: 'Obs: Listar Árbol', value: 'getObservacionArbol', action: 'Obs listar rbol a condicion comercial', },
            { name: 'Obs: Crear', value: 'createObservacion', action: 'Obs crear a condicion comercial', },
            { name: 'Obs: Actualizar', value: 'updateObservacion', action: 'Obs actualizar a condicion comercial', },
            { name: 'Obs: Eliminar', value: 'deleteObservacion', action: 'Obs eliminar a condicion comercial', },
        ],
        default: 'getPagoArbol',
    },
];
exports.condicionComercialFields = [
    {
        displayName: 'ID / Alias',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: { service: ['sifac'], resource: ['condicionComercial'], operation: ['getPago', 'getPagoManuales', 'deletePago', 'getDescuento', 'getDescuentoByAlias', 'deleteDescuento', 'deleteObservacion'] }
        },
        description: 'ID de la entidad (CtaReagAuxi) o Alias',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['condicionComercial'] } },
    },
];
//# sourceMappingURL=description.js.map