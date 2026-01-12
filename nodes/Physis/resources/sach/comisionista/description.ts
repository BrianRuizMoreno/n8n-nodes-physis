import { INodeProperties } from 'n8n-workflow';

export const comisionistaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['comisionista'] } },
        options: [

            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista comisionistas (filtro opcional).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de un comisionista.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un comisionista.' },
            { name: 'Listar Árbol (Activos)', value: 'getArbol', description: 'GET Lista para Tree View (Solo activos).' },
            { name: 'Listar Árbol (Todos)', value: 'getArbolAll', description: 'GET Lista para Tree View (Todos).' },
            { name: 'Obtener por Cliente', value: 'getByCliente', description: 'GET Comisionistas asociados a un cliente.' },
            { name: 'Obtener Automáticos (Cliente)', value: 'getAutoByCliente', description: 'GET Comisionistas sugeridos para un Lote (por Cliente).' },
            { name: 'Obtener Clientes de Comisionista', value: 'getClientesOfComisionista', description: 'GET Clientes asociados a un comisionista.' },
            { name: 'Obtener por Lugar', value: 'getByLugar', description: 'GET Comisionistas asociados a un lugar.' },
            { name: 'Obtener Disponibles (Lugar)', value: 'getAvailableForLugar', description: 'GET Comisionistas disponibles para asignar a un lugar.' },
            { name: 'Obtener Automáticos (Lugar)', value: 'getAutoByLugar', description: 'GET Comisionistas sugeridos para un Lote (por Lugar).' },
        ],
        default: 'getAll',
    },
];

export const comisionistaFields: INodeProperties[] = [

    {
        displayName: 'ID Comisionista (CtaAuxi)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['comisionista'], 
                operation: ['get', 'getClientesOfComisionista'] 
            } 
        },
        description: 'Código de cuenta auxiliar del comisionista.',
    },
    {
        displayName: 'ID Cliente (CtaAuxi)',
        name: 'idCliente',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['comisionista'], 
                operation: ['getByCliente'] 
            } 
        },
        description: 'Código de cuenta auxiliar del cliente.',
    },
    {
        displayName: 'ID Lugar',
        name: 'idLugar',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['comisionista'], 
                operation: ['getByLugar', 'getAvailableForLugar'] 
            } 
        },
        description: 'Identificador del lugar.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['comisionista']
            },
            hide: {
                operation: ['get', 'getByCliente', 'getByLugar', 'getAvailableForLugar', 'getClientesOfComisionista']
            }
        },
        description: 'Para Update (Objeto Completo) o para Filtros automáticos (TipoCliente, idTipoOperacion, fechaOperacion, etc.).',
    },
];