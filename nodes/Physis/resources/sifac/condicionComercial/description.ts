import { INodeProperties } from 'n8n-workflow';

export const condicionComercialOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['condicionComercial'] } },
        options: [

            { name: 'Pagos: Listar Árbol', value: 'getPagoArbol' },
            { name: 'Pagos: Obtener', value: 'getPago' },
            { name: 'Pagos: Vencimientos Manuales', value: 'getPagoManuales' },
            { name: 'Pagos: Crear', value: 'createPago' },
            { name: 'Pagos: Actualizar', value: 'updatePago' },
            { name: 'Pagos: Eliminar', value: 'deletePago' },
            { name: 'Desc: Listar Árbol', value: 'getDescuentoArbol' },
            { name: 'Desc: Obtener', value: 'getDescuento' },
            { name: 'Desc: Obtener por Alias', value: 'getDescuentoByAlias' },
            { name: 'Desc: Crear', value: 'createDescuento' },
            { name: 'Desc: Actualizar', value: 'updateDescuento' },
            { name: 'Desc: Eliminar', value: 'deleteDescuento' },
            { name: 'Obs: Listar Árbol', value: 'getObservacionArbol' },
            { name: 'Obs: Crear', value: 'createObservacion' },
            { name: 'Obs: Actualizar', value: 'updateObservacion' },
            { name: 'Obs: Eliminar', value: 'deleteObservacion' },
        ],
        default: 'getPagoArbol',
    },
];

export const condicionComercialFields: INodeProperties[] = [
    {
        displayName: 'ID / Alias',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['condicionComercial'], operation: ['getPago', 'getPagoManuales', 'deletePago', 'getDescuento', 'getDescuentoByAlias', 'deleteDescuento', 'deleteObservacion'] } 
        },
        description: 'ID de la entidad (CtaReagAuxi) o Alias.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['condicionComercial'] } },
    },
];