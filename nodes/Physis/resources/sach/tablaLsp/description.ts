import { INodeProperties } from 'n8n-workflow';

export const tablaLspOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tablaLsp'] } },
        options: [
            { name: 'Listar Motivos', value: 'getMotivos', description: 'GET Motivos AFIP para LSP.' },
            { name: 'Listar Especies', value: 'getEspecies', description: 'GET Especies AFIP para LSP.' },
            { name: 'Listar Razas', value: 'getRazas', description: 'GET Razas AFIP por Especie.' },
            { name: 'Listar Categorías', value: 'getCategorias', description: 'GET Categorías AFIP por Especie.' },
            { name: 'Listar Tipos de Tributo', value: 'getTipoTributo', description: 'GET Tipos de tributo para LSP.' },
            { name: 'Listar Gastos', value: 'getGastos', description: 'GET Códigos de gastos AFIP para LSP.' },
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
        description: 'Código de la especie para filtrar (ej: 1 para Bovinos).',
    },
];