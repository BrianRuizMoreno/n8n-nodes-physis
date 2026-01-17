import { INodeProperties } from 'n8n-workflow';

export const tablaLspOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tablaLsp'] } },
        options: [
            { name: 'Listar Motivos', value: 'getMotivos', description: 'GET Motivos AFIP para LSP', action: 'Listar Motivos a tabla lsp',},
            { name: 'Listar Especies', value: 'getEspecies', description: 'GET Especies AFIP para LSP', action: 'Listar Especies a tabla lsp',},
            { name: 'Listar Razas', value: 'getRazas', description: 'GET Razas AFIP por Especie', action: 'Listar Razas a tabla lsp',},
            { name: 'Listar Categorías', value: 'getCategorias', description: 'GET Categorías AFIP por Especie', action: 'Listar Categorías a tabla lsp',},
            { name: 'Listar Tipos De Tributo', value: 'getTipoTributo', description: 'GET Tipos de tributo para LSP', action: 'Listar Tipos de Tributo a tabla lsp',},
            { name: 'Listar Gastos', value: 'getGastos', description: 'GET Códigos de gastos AFIP para LSP', action: 'Listar Gastos a tabla lsp',},
        ],
        default: 'getMotivos',
    },
];

export const tablaLspFields: INodeProperties[] = [
    {
        displayName: 'ID Especie',
        name: 'idEspecie',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['tablaLsp'], 
                operation: ['getRazas', 'getCategorias'] 
            } 
        },
        description: 'Código de la especie para filtrar (ej: 1 para Bovinos)',
    },
];