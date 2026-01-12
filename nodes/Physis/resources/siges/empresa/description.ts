import { INodeProperties } from 'n8n-workflow';

export const empresaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['empresa'] } },
        options: [
            { name: 'Listar Habilitadas', value: 'getAll', description: 'GET Empresas habilitadas al usuario.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de empresa.' },
            { name: 'Obtener Logo', value: 'getLogo', description: 'GET Logo de empresa.' },
            { name: 'Empresa Actual', value: 'getCurrent', description: 'GET Datos de la empresa en contexto.' },
            { name: 'Nombre Actual', value: 'getCurrentName', description: 'GET Nombre de la empresa actual.' },
            { name: 'Aplicaciones', value: 'getApps', description: 'GET Apps habilitadas.' },
            { name: 'Buscar por CUIT', value: 'getByCuit', description: 'GET Busca empresa por CUIT.' },
        ],
        default: 'getAll',
    },
];

export const empresaFields: INodeProperties[] = [
    {
        displayName: 'ID Empresa / CUIT',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['empresa'], operation: ['get', 'getLogo', 'getByCuit'] } },
    },
];