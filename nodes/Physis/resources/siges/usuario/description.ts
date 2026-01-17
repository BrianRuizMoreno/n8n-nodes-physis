import { INodeProperties } from 'n8n-workflow';

export const usuarioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['usuario'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve el listado básico de usuarios' 
																																																					action: 'Listar Todos an usuario',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve los datos completos de un usuario' 
																																																				action: 'Obtener por ID an usuario',},
            { name: 'Terceros Relacionados', value: 'getTerceros', description: 'GET Devuelve las cuentas auxiliares asociadas a un usuario' 
																																																																			action: 'Terceros Relacionados an usuario',},
            { name: 'Relacionar Terceros', value: 'linkTercero', description: 'POST Asigna cuentas auxiliares a un usuario' 
																																																																	action: 'Relacionar Terceros an usuario',},
        ],
        default: 'getAll',
    },
];

export const usuarioFields: INodeProperties[] = [
    {
        displayName: 'ID Usuario',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['usuario'], 
                operation: ['get', 'getTerceros', 'linkTercero'] 
            } 
        },
        description: 'Identificador numérico del usuario',
    },
    {
        displayName: 'ID Plan Auxiliar (idAuxi)',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['usuario'], 
                operation: ['getTerceros', 'linkTercero'] 
            } 
        },
        description: 'Identificador del Plan Auxiliar (ej: 1 para Clientes, 2 para Proveedores)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '[]',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['usuario'],
                operation: ['linkTercero']
            } 
        },
        description: 'Array de Strings con los IDs de las Cuentas Auxiliares a relacionar. Ej: ["CLIENTE01", "CLIENTE02"].',
    },
];