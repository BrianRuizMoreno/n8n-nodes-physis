import { INodeProperties } from 'n8n-workflow';

export const maestroGeneralOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'] } },
        options: [
            { name: 'Contables: Árbol', value: 'getContablesArbol' },
            { name: 'Dominios: Listar', value: 'getDominios' },
            { name: 'Dominios: Obtener', value: 'getDominio' },
            { name: 'Dominios: Listar PLA', value: 'getDominiosPLA' },
            { name: 'Cabeceras: Buscar', value: 'searchCabeceras' },
        ],
        default: 'getContablesArbol',
    },
];

export const maestroGeneralFields: INodeProperties[] = [
    {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'], operation: ['getDominio'] } },
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'] } },
    },
];