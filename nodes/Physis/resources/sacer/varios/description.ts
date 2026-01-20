import { INodeProperties } from 'n8n-workflow';

export const variosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['liquidacion'] } },
        options: [
            { name: 'Obtener PDF', value: 'getPdf', description: 'GET PDF de Liquidación', action: 'Obtener PDF a liquidacion',},
        ],
        default: 'getPdf',
    },
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['localidad'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista localidades con filtros', action: 'Listar localidades a localidad',},
        ],
        default: 'getAll',
    },
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['lote'] } },
        options: [
            { name: 'Obtener Por Código', value: 'get', description: 'GET Un lote por su código', action: 'Obtener por c digo a lote',},
            { name: 'Obtener Por Tercero', value: 'getByTercero', description: 'GET Lotes de un tercero', action: 'Obtener por tercero a lote',},
        ],
        default: 'get',
    },
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['muestra'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista de muestras filtradas', action: 'Listar muestras a muestra',},
            { name: 'Obtener Detalle', value: 'get', description: 'GET Una muestra específica', action: 'Obtener detalle a muestra',},
        ],
        default: 'getAll',
    },
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['sucursal'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Todas las sucursales', action: 'Listar sucursales a sucursal',},
        ],
        default: 'getAll',
    },
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['tipoTercero'] } },
        options: [
            { name: 'Tipos Tercero', value: 'getTercero', description: 'GET Devuelve todas las tarifas de Tercero', action: 'Tipos tercero a tipo tercero',},
        ],
        default: 'getTercero',
    },
];


export const variosFields: INodeProperties[] = [

    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['liquidacion'] } },
        description: 'ID del ejercicio contable',
    },
    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['liquidacion'] } },
        description: 'ID del comprobante',
    },
    {
        displayName: 'Cód Lote',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['lote'], operation: ['get'] } },
        description: 'Código del lote',
    },
    {
        displayName: 'ID Auxiliar',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['lote'], operation: ['getByTercero'] } },
        description: 'Tipo de auxiliar',
    },
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['lote'], operation: ['getByTercero'] } },
        description: 'Cuenta auxiliar',
    },
    {
        displayName: 'ID Carta Porte',
        name: 'idCartaPorte',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['muestra'], operation: ['get'] } },
        description: 'ID de la Carta de Porte',
    },
    {
        displayName: 'Nro Muestra',
        name: 'nroMuestra',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { show: { service: ['sacer'], resource: ['muestra'], operation: ['get'] } },
        description: 'Número de la muestra',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['localidad', 'lote', 'muestra'] 
            },
            hide: {
                resource: ['lote'],
                operation: ['get'] 
            }
        },
        description: 'Parámetros de consulta (Query String). Ej: nombreLocalidad, estado, codCampania, etc.',
    },
];