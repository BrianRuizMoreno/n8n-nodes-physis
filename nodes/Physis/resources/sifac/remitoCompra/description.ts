import { INodeProperties } from 'n8n-workflow';

export const remitoCompraOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['remitoCompra'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista remitos. Filtros: { "fechaDesde": "YYYY-MM-DD", "top": 10 }.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de un remito de compra (idCabecera).' },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo remito de compra.' },
        ],
        default: 'getAll',
    },
];

export const remitoCompraFields: INodeProperties[] = [
    {
        displayName: 'ID Remito (Cabecera)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['remitoCompra'], 
                operation: ['get'] 
            } 
        },
        description: 'Identificador único de la cabecera del remito.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['remitoCompra'] 
            } 
        },
        description: 'Cuerpo para Crear o Filtros para Listar (ej: {"top": 50}).',
    },
];