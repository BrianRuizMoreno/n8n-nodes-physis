import { INodeProperties } from 'n8n-workflow';

export const pesajeOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['pesaje'] } },
        options: [
            { name: 'Básculas: Listar', value: 'getAllBasculas', description: 'GET Lista de básculas configuradas', action: 'List scales' },
            { name: 'Básculas: Obtener', value: 'getBascula', description: 'GET Detalle de una báscula', action: 'Get scale' },
            { name: 'Básculas: Peso Actual', value: 'getBasculaPeso', description: 'GET Estado y peso en tiempo real', action: 'Get current weight' },
            { name: 'Tickets: Abrir (Entrada)', value: 'openTicket', description: 'POST Genera ticket nuevo con pesada de entrada', action: 'Open ticket entry' },
            { name: 'Tickets: Anular', value: 'voidTicket', description: 'PUT Anula un ticket existente', action: 'Void ticket' },
            { name: 'Tickets: Cerrar (Salida)', value: 'closeTicket', description: 'POST Guarda pesada de salida y cierra ticket', action: 'Close ticket exit' },
            { name: 'Tickets: Listar', value: 'getAllTickets', description: 'GET Lista tickets (filtros opcionales)', action: 'List tickets' },
            { name: 'Tickets: Modificar', value: 'updateTicket', description: 'PUT Modifica datos de un ticket abierto', action: 'Update ticket' },
            { name: 'Tickets: Obtener', value: 'getTicket', description: 'GET Detalle de un ticket', action: 'Get ticket' },
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