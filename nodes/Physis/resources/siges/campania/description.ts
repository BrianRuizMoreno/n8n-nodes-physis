import { INodeProperties } from 'n8n-workflow';

export const campaniaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['campania'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Listado de campañas.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de campaña.' },
            { name: 'Campaña Activa', value: 'getActive', description: 'GET Campaña actual del usuario o sistema.' },
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