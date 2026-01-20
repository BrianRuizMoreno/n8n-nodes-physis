import { INodeProperties } from 'n8n-workflow';

export const pesajeOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['pesaje'] } },
        options: [

            { name: 'Básculas: Listar', value: 'getAllBasculas', description: 'GET Lista de básculas configuradas', action: 'Básculas: Listar a pesaje',},
            { name: 'Básculas: Obtener', value: 'getBascula', description: 'GET Detalle de una báscula', action: 'Básculas: Obtener a pesaje',},
            { name: 'Básculas: Peso Actual', value: 'getBasculaPeso', description: 'GET Estado y peso en tiempo real', action: 'Básculas: Peso Actual a pesaje',},
            { name: 'Tickets: Listar', value: 'getAllTickets', description: 'GET Lista tickets (filtros opcionales)', action: 'Tickets: Listar a pesaje',},
            { name: 'Tickets: Obtener', value: 'getTicket', description: 'GET Detalle de un ticket', action: 'Tickets: Obtener a pesaje',},
            { name: 'Tickets: Abrir (Entrada)', value: 'openTicket', description: 'POST Genera ticket nuevo con pesada de entrada', action: 'Tickets: Abrir (Entrada) a pesaje',},
            { name: 'Tickets: Modificar', value: 'updateTicket', description: 'PUT Modifica datos de un ticket abierto', action: 'Tickets: Modificar a pesaje',},
            { name: 'Tickets: Cerrar (Salida)', value: 'closeTicket', description: 'POST Guarda pesada de salida y cierra ticket', action: 'Tickets: Cerrar (Salida) a pesaje',},
            { name: 'Tickets: Anular', value: 'voidTicket', description: 'PUT Anula un ticket existente', action: 'Tickets: Anular a pesaje',},
        ],
        default: 'getAllTickets',
    },
];

export const pesajeFields: INodeProperties[] = [
    {
        displayName: 'ID Báscula / Ticket',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['pesaje'], 
                operation: ['getBascula', 'getBasculaPeso', 'getTicket', 'updateTicket', 'closeTicket', 'voidTicket'] 
            } 
        },
        description: 'Identificador numérico de la Báscula o del Ticket según la operación',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['pesaje'] 
            } 
        },
        description: 'Filtros para listar o datos para Abrir/Cerrar/Modificar (ej: patente, peso, idBascula)',
    },
];