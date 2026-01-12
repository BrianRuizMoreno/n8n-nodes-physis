import { INodeProperties } from 'n8n-workflow';

export const establecimientoAgropecuarioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['establecimientoAgropecuario'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista establecimientos agropecuarios.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un establecimiento específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo establecimiento.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un establecimiento existente.' },
            { name: 'Listar por Cliente', value: 'getByCliente', description: 'GET Establecimientos asociados a un cliente.' },
            { name: 'Listar RENSPA y Establecimientos', value: 'getRenspaByCliente', description: 'GET Datos RENSPA y establecimientos de un cliente.' },
        ],
        default: 'getAll',
    },
];

export const establecimientoAgropecuarioFields: INodeProperties[] = [
    {
        displayName: 'ID Establecimiento',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['establecimientoAgropecuario'], 
                operation: ['get'] 
            } 
        },
        description: 'Código identificador del establecimiento.',
    },
    {
        displayName: 'JSON Body / Parámetros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['establecimientoAgropecuario']
            },
            hide: {
                operation: ['getAll', 'get']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros Query String para búsquedas por cliente (IdAuxi, IdCtaAuxi).',
    },
];