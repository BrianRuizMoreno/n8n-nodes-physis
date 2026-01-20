import { INodeProperties } from 'n8n-workflow';

export const auxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['auxiliar'] } },
        options: [

            { name: 'Listar Campañas', value: 'getCampanias', description: 'GET Lista todas las campañas disponibles', action: 'Listar campa as an auxiliar',},
            { name: 'Listar Campañas Por Usuario', value: 'getCampaniasUsuario', description: 'GET Lista campañas habilitadas para un usuario específico', action: 'Listar campa as por usuario an auxiliar',},
            { name: 'Listar Cereales', value: 'getCereales', description: 'GET Lista todos los cereales', action: 'Listar cereales an auxiliar',},
            { name: 'Consultar Stock De Cereales', value: 'getCerealesStock', description: 'GET Stock de cereales por campaña y fecha', action: 'Consultar stock de cereales an auxiliar',},
        ],
        default: 'getCampanias',
    },
];

export const auxiliarFields: INodeProperties[] = [

    {
        displayName: 'ID Usuario',
        name: 'idUsuario',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['auxiliar'], 
                operation: ['getCampaniasUsuario'] 
            } 
        },
        description: 'Identificador del usuario',
    },
        {
        displayName: 'Incluir Opción "Todos"',
        name: 'incluirRowTodos',
        type: 'boolean',
        default: false,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['auxiliar'], 
                operation: ['getCampanias', 'getCereales'] 
            } 
        },
        description: 'Si es verdadero, incluye un registro inicial representando "Todos"',
    },
    {
        displayName: 'Código Campaña',
        name: 'codCampania',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['auxiliar'], 
                operation: ['getCerealesStock'] 
            } 
        },
        description: 'Código de la campaña a consultar',
    },
    {
        displayName: 'Fecha',
        name: 'fecha',
        type: 'dateTime',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['auxiliar'], 
                operation: ['getCerealesStock'] 
            } 
        },
        description: 'Fecha de corte para el stock',
    },
];