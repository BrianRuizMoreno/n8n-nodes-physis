import { INodeProperties } from 'n8n-workflow';

export const historiaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['historia'] } },
        options: [
            { 
                name: 'Obtener Historia Clínica', 
                value: 'get', 
                description: 'GET Recupera los datos de una historia clínica específica.' 
            },
        ],
        default: 'get',
    },
];

export const historiaFields: INodeProperties[] = [
    {
        displayName: 'Código de Historia',
        name: 'codigohistoria',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['historia'],
                operation: ['get'] 
            } 
        },
        description: 'Identificador único del paciente o expediente.',
    },
    {
        displayName: 'Key (Clave)',
        name: 'key',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['historia'],
                operation: ['get'] 
            } 
        },
        description: 'Clave de seguridad o token de acceso específico para la historia.',
    },
    {
        displayName: 'Servidor (Opcional)',
        name: 'servidor',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['historia'],
                operation: ['get'] 
            } 
        },
        description: 'Nombre o IP del servidor de datos si la arquitectura es distribuida.',
    },
];