import { INodeProperties } from 'n8n-workflow';

export const insumoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['insumo'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Lista de insumos con múltiples filtros opcionales' 
																action: 'Listar Todos an insumo',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Datos de un insumo específico (IdProducto)' 
																action: 'Obtener por ID an insumo',
            },
            { 
                name: 'Obtener por Labor', 
                value: 'getByLabor', 
                description: 'GET Insumos asociados a una labor (IdLabor)' 
																action: 'Obtener por Labor an insumo',
            },
        ],
        default: 'getAll',
    },
];

export const insumoFields: INodeProperties[] = [
    {
        displayName: 'ID Insumo / Labor',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['insumo'], 
                operation: ['get', 'getByLabor'] 
            } 
        },
        description: 'Ingrese el IdProducto (para "Obtener por ID") o el IdLabor (para "Obtener por Labor")',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['insumo'],
                operation: ['getAll', 'getByLabor'] 
            } 
        },
        description: 'Parámetros Query opcionales. Ej: {"sDeposito": "X", "bSoloImputables": true, "bColExistencia": true, "reducido": true}.',
    },
];