import { INodeProperties } from 'n8n-workflow';

export const campaniaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['campania'] } },
        options: [

            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista todas las campañas definidas.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva campaña.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una campaña existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una campaña.' },
            { name: 'Campañas de Usuario', value: 'getByUser', description: 'GET Lista campañas de un usuario específico.' },
            { name: 'Detalle por Usuario', value: 'getDetailByUser', description: 'GET Detalle de campaña y estado para un usuario.' },
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
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['campania'], 
                operation: ['delete', 'getDetailByUser'] 
            } 
        },
        description: 'Identificador numérico de la campaña.',
    },
    {
        displayName: 'ID Usuario',
        name: 'idUsuario',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['campania'], 
                operation: ['getByUser', 'getDetailByUser'] 
            } 
        },
        description: 'Identificador del usuario.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['campania'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar la campaña.',
    },
];