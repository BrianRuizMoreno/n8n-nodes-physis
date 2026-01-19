import { INodeProperties } from 'n8n-workflow';

export const pedidoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['pedido'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista pedidos. Filtros: { "fechaDesde": "YYYY-MM-DD", "top": 10 }.', action: 'Listar Todos a pedido',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de un pedido (idCabecera)', action: 'Obtener por ID a pedido',},
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo pedido', action: 'Crear a pedido',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un pedido existente', action: 'Actualizar a pedido',},
            { name: 'Comprobantes Asociados', value: 'getComprobantesAsociados', description: 'GET Comprobantes relacionados. Req: Body con comprobante base.', action: 'Comprobantes Asociados a pedido',},
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
        description: 'Identificador único de la cabecera del pedido',
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