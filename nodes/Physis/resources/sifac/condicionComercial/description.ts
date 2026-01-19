import { INodeProperties } from 'n8n-workflow';

export const condicionComercialOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['condicionComercial'] } },
        options: [

            { name: 'Pagos: Listar Árbol', value: 'getPagoArbol', action: 'Pagos: Listar Árbol a condicion comercial',},
            { name: 'Pagos: Obtener', value: 'getPago', action: 'Pagos: Obtener a condicion comercial',},
            { name: 'Pagos: Vencimientos Manuales', value: 'getPagoManuales', action: 'Pagos: Vencimientos Manuales a condicion comercial',},
            { name: 'Pagos: Crear', value: 'createPago', action: 'Pagos: Crear a condicion comercial',},
            { name: 'Pagos: Actualizar', value: 'updatePago', action: 'Pagos: Actualizar a condicion comercial',},
            { name: 'Pagos: Eliminar', value: 'deletePago', action: 'Pagos: Eliminar a condicion comercial',},
            { name: 'Desc: Listar Árbol', value: 'getDescuentoArbol', action: 'Desc: Listar Árbol a condicion comercial',},
            { name: 'Desc: Obtener', value: 'getDescuento', action: 'Desc: Obtener a condicion comercial',},
            { name: 'Desc: Obtener por Alias', value: 'getDescuentoByAlias', action: 'Desc: Obtener por Alias a condicion comercial',},
            { name: 'Desc: Crear', value: 'createDescuento', action: 'Desc: Crear a condicion comercial',},
            { name: 'Desc: Actualizar', value: 'updateDescuento', action: 'Desc: Actualizar a condicion comercial',},
            { name: 'Desc: Eliminar', value: 'deleteDescuento', action: 'Desc: Eliminar a condicion comercial',},
            { name: 'Obs: Listar Árbol', value: 'getObservacionArbol', action: 'Obs: Listar Árbol a condicion comercial',},
            { name: 'Obs: Crear', value: 'createObservacion', action: 'Obs: Crear a condicion comercial',},
            { name: 'Obs: Actualizar', value: 'updateObservacion', action: 'Obs: Actualizar a condicion comercial',},
            { name: 'Obs: Eliminar', value: 'deleteObservacion', action: 'Obs: Eliminar a condicion comercial',},
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