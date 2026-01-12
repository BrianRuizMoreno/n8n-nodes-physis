import { INodeProperties } from 'n8n-workflow';

export const indicadorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['indicador'] } },
        options: [
            { name: 'Tasa Default', value: 'getTasaDefault', description: 'GET Última tasa moneda funcional.' },
            { name: 'Tasa Serie', value: 'getTasaSerie', description: 'GET Tasa de indicador específico.' },
            { name: 'Guardar Tasa', value: 'setTasa', description: 'POST Inserta o actualiza tasa.' },
        ],
        default: 'getTasaDefault',
    },
];

export const indicadorFields: INodeProperties[] = [
    {
        displayName: 'ID Indicador',
        name: 'idIndicador',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'], operation: ['getTasaSerie', 'setTasa'] } },
    },
    {
        displayName: 'ID Serie',
        name: 'idSerie',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'], operation: ['getTasaSerie', 'setTasa'] } },
    },
    {
        displayName: 'Valor Tasa',
        name: 'tasa',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'], operation: ['setTasa'] } },
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['siges'], resource: ['indicador'] } },
    },
];