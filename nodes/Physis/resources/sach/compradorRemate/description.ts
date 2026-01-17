import { INodeProperties } from 'n8n-workflow';

export const compradorRemateOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['compradorRemate'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista compradores de un remate', action: 'Listar Compradores a comprador remate',},
            { name: 'Agregar Comprador', value: 'create', description: 'POST Asocia un comprador al remate', action: 'Agregar Comprador a comprador remate',},
            { name: 'Eliminar Comprador', value: 'delete', description: 'DELETE Quita un comprador específico del remate', action: 'Eliminar Comprador a comprador remate',},
            { name: 'Eliminar Todos', value: 'deleteAll', description: 'DELETE Vacía la lista de compradores del remate', action: 'Eliminar Todos a comprador remate',},
        ],
        default: 'getAll',
    },
];

export const compradorRemateFields: INodeProperties[] = [
    {
        displayName: 'ID Puesto Carga',
        name: 'idPuestoCarga',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['compradorRemate'] 
            } 
        },
        description: 'Identificador del puesto de carga (Puesto físico/lógico)',
    },
    {
        displayName: 'ID Remate Feria',
        name: 'idRemateFeria',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['compradorRemate'] 
            } 
        },
        description: 'Identificador del remate feria',
    },
    {
        displayName: 'ID Cuenta Auxiliar (Comprador)',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['compradorRemate'],
                operation: ['create', 'delete']
            } 
        },
        description: 'Código del comprador (Cliente) a agregar o eliminar',
    },
];