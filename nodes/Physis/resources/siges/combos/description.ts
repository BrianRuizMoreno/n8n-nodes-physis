import { INodeProperties } from 'n8n-workflow';

export const combosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['combos'] } },
        options: [
            { 
                name: 'Obtener Lista (Combo)', 
                value: 'getCombo', 
                description: 'GET Obtiene una lista simple de opciones (ID/Nombre) para poblar selectores',
                action: 'Obtener lista combo a combos',
            },
            { 
                name: 'Listar Tipos Disponibles', 
                value: 'getSearchTypes', 
                description: 'GET Devuelve los metadatos de qué tipos de búsqueda están disponibles',
                action: 'Listar tipos disponibles a combos',
            },
        ],
        default: 'getCombo',
    },
];

export const combosFields: INodeProperties[] = [
    {
        displayName: 'Tipo De Lista',
        name: 'comboType',
        type: 'options',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['combos'],
                operation: ['getCombo'] 
            } 
        },
        options: [
            { name: 'Condiciones De Pago', value: 'condiciones-pago' },
            { name: 'Condiciones De Venta', value: 'condiciones-venta' },
            { name: 'Vendedores', value: 'vendedores' },
            { name: 'Compradores', value: 'compradores' },
            { name: 'Transportes', value: 'transportes' },
            { name: 'Descuentos', value: 'descuentos' },
            { name: 'Observaciones', value: 'observaciones' },
            { name: 'Listas De Compras', value: 'listas-compras' },
            { name: 'Listas De Ventas', value: 'listas-ventas' },
            { name: 'Listas VNR (Valor Neto Realiz)', value: 'listas-vnr' },
        ],
        default: 'vendedores',
        description: 'Seleccione qué entidad desea listar',
    },
    {
        displayName: 'ID Plan Principal',
        name: 'idPpal',
        type: 'number',
        default: 1,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['combos'],
                operation: ['getCombo'] 
            } 
        },
        description: 'Contexto del plan principal (Generalmente 1)',
    },
    {
        displayName: 'ID Auxiliar (Filtro)',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['combos'],
                operation: ['getCombo'] 
            } 
        },
        description: 'Opcional. Filtrar lista por un rubro específico (ej: Traer vendedores asociados a este rubro).',
    },
];