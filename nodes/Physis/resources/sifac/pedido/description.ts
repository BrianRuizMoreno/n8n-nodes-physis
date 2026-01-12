import { INodeProperties } from 'n8n-workflow';

export const pedidoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['pedido'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista pedidos. Filtros: { "fechaDesde": "YYYY-MM-DD", "top": 10 }.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de un pedido (idCabecera).' },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo pedido.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un pedido existente.' },
            { name: 'Comprobantes Asociados', value: 'getComprobantesAsociados', description: 'GET Comprobantes relacionados. Req: Body con comprobante base.' },
        ],
        default: 'getAll',
    },
];

export const pedidoFields: INodeProperties[] = [
    {
        displayName: 'ID Pedido (Cabecera)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['pedido'], 
                operation: ['get', 'update', 'getComprobantesAsociados'] 
            } 
        },
        description: 'Identificador único de la cabecera del pedido.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['pedido'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listar. Para Asociados: Body del comprobante base.',
    },
];