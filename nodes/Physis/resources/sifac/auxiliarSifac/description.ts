import { INodeProperties } from 'n8n-workflow';

export const auxiliarSifacOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['auxiliarSifac'] } },
        options: [
            { name: 'Listar Parámetros', value: 'getParametros', description: 'GET Lista todos los parámetros de configuración de SIFAC', action: 'Listar Parámetros an auxiliar sifac',},
            { name: 'Obtener Parámetro', value: 'getParametro', description: 'GET Valor de un parámetro específico', action: 'Obtener Parámetro an auxiliar sifac',},
            { name: 'Parámetros Factura Mostrador', value: 'getParametrosFacturaMostrador', description: 'GET Defaults para facturación mostrador (opcional por tercero)', action: 'Parámetros Factura Mostrador an auxiliar sifac',},
            { name: 'Listar Módulos', value: 'getModulos', description: 'GET Módulos y vectores instalados', action: 'Listar Módulos an auxiliar sifac',},
            { name: 'Reagrupaciones Default (Terceros)', value: 'getReagrupacionesDefault', description: 'GET Reagrupaciones por defecto de un cliente/proveedor', action: 'Reagrupaciones Default (Terceros) an auxiliar sifac',},
        ],
        default: 'getParametros',
    },
];

export const auxiliarSifacFields: INodeProperties[] = [

    {
        displayName: 'Nombre Parámetro',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['auxiliarSifac'], operation: ['getParametro'] } 
        },
        description: 'Nombre del parámetro a consultar (Ej: GeneraAsiento, IdAuxiClientes, etc)',
    },
    {
        displayName: 'ID Auxi',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['auxiliarSifac'], operation: ['getReagrupacionesDefault'] } 
        },
        description: 'Identificador numérico del tercero (Cliente/Proveedor)',
    },
    {
        displayName: 'ID Cta Auxi',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { service: ['sifac'], resource: ['auxiliarSifac'], operation: ['getReagrupacionesDefault'] } 
        },
        description: 'Identificador alfanumérico de la cuenta del tercero',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { service: ['sifac'], resource: ['auxiliarSifac'] },
            hide: { operation: ['getParametros', 'getParametro', 'getModulos'] }
        },
        description: 'Filtros opcionales (Ej: para Factura Mostrador: {"idAuxi": 1, "idCtaAuxi": "..."})',
    },
];