import { INodeProperties } from 'n8n-workflow';

export const empresaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['empresa'] } },
        options: [
            { name: 'Empresa Actual', value: 'getCurrent', description: 'GET Datos de la empresa en contexto.' },
            { name: 'Nombre Actual', value: 'getCurrentName', description: 'GET Nombre de la empresa actual.' },
            { name: 'Aplicaciones', value: 'getApps', description: 'GET Apps habilitadas.' },
            { name: 'Buscar por CUIT', value: 'getByCuit', description: 'GET Busca empresa por CUIT.' },
        ],
        default: 'getCurrent',
    },
];

export const empresaFields: INodeProperties[] = [
    {
        displayName: 'ID Empresa / CUIT',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['empresa'], operation: ['getByCuit'] } },
    },
];