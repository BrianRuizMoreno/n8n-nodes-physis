import { INodeProperties } from 'n8n-workflow';

export const maestroGeneralOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'] } },
        options: [
            { name: 'Contables: Árbol', value: 'getContablesArbol', description: 'GET Árbol de contables', action: 'Contables: Árbol a maestro general',},
            { name: 'Dominios: Listar', value: 'getDominios', description: 'GET Listado de dominios', action: 'Dominios: Listar a maestro general',},
            { name: 'Dominios: Obtener', value: 'getDominio', description: 'GET Obtener un dominio por su ID', action: 'Dominios: Obtener a maestro general',},
            { name: 'Dominios: Listar PLA', value: 'getDominiosPLA', description: 'GET Listado de dominios PLA', action: 'Dominios: Listar PLA a maestro general',},
            { name: 'Cabeceras: Buscar', value: 'searchCabeceras', description: 'GET Buscar cabeceras', action: 'Cabeceras: Buscar a maestro general',},
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