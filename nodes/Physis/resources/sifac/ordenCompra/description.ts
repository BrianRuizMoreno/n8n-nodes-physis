import { INodeProperties } from 'n8n-workflow';

export const ordenCompraOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['ordenCompra'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista órdenes. Filtros: { "fechaDesde": "YYYY-MM-DD", "top": 10 }.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de una orden de compra (idCabecera).' },
            { name: 'Crear', value: 'create', description: 'POST Crea una nueva orden de compra.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una orden existente.' },
        ],
        default: 'getAll',
    },
];

export const ordenCompraFields: INodeProperties[] = [
    {
        displayName: 'ID Orden (Cabecera)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['ordenCompra'], 
                operation: ['get', 'update'] 
            } 
        },
        description: 'Identificador único de la cabecera de la orden.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['ordenCompra'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listar (ej: {"top": 50}).',
    },
];