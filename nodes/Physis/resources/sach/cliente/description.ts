import { INodeProperties } from 'n8n-workflow';

export const clienteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['cliente'] } },
        options: [
            { name: 'Buscar Clientes', value: 'getAll', description: 'GET Busca clientes por nombre, código o alias.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene datos de un cliente específico.' },
            { name: 'Pendientes de Emisión', value: 'getPendientesEmision', description: 'GET Lista clientes con liquidaciones pendientes.' },
            { name: 'SubCuentas', value: 'getSubcuentas', description: 'GET Obtiene subcuentas de un cliente.' },
            { name: 'Categorías RFOCB (Cliente)', value: 'getCategoriasRfocb', description: 'GET Categorías RFOCB de un cliente específico.' },
            { name: 'Categorías RFOCB (Todas)', value: 'getAllCategoriasRfocb', description: 'GET Todas las categorías RFOCB para un tipo de hacienda.' },
        ],
        default: 'getAll',
    },
];

export const clienteFields: INodeProperties[] = [
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['cliente'], 
                operation: ['get'] 
            } 
        },
        description: 'Código de la cuenta auxiliar del cliente.',
    },
    {
        displayName: 'Filtros / Parámetros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['cliente']
            } 
        },
        description: 'Parámetros Query String (ej: {"filtro": "juan"}, {"IdTipoHacienda": "VAC"}, {"IdCtaAuxi": "..."}).',
    },
];