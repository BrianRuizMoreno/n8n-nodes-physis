import { INodeProperties } from 'n8n-workflow';

export const establecimientoFaenadorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['establecimientoFaenador'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista establecimientos faenadores.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un establecimiento específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo establecimiento.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un establecimiento existente.' },
            { name: 'Listar por Cliente', value: 'getByCliente', description: 'GET Establecimientos faenadores asociados a un cliente.' },
            { name: 'Listar ONCCA y Establecimientos', value: 'getOnccaByCliente', description: 'GET Datos ONCCA y establecimientos de un cliente.' },
        ],
        default: 'getAll',
    },
];

export const establecimientoFaenadorFields: INodeProperties[] = [
    {
        displayName: 'ID Establecimiento',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['establecimientoFaenador'], 
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
                resource: ['establecimientoFaenador']
            },
            hide: {
                operation: ['getAll', 'get']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros Query String para búsquedas por cliente (IdAuxi, IdCtaAuxi).',
    },
];