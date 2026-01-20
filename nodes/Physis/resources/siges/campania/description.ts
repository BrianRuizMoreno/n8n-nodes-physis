import { INodeProperties } from 'n8n-workflow';

export const campaniaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['campania'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Listado de campañas', action: 'Listar Todas a campania',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de campaña', action: 'Obtener por ID a campania',},
            { name: 'Campaña Activa', value: 'getActive', description: 'GET Campaña actual del usuario o sistema', action: 'Campaña Activa a campania',},
        ],
        default: 'getAll',
    },
];

export const campaniaFields: INodeProperties[] = [
    {
        displayName: 'ID Campaña',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['campania'], operation: ['get'] } },
    },
];