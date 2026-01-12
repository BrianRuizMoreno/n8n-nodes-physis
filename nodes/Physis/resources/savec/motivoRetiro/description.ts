import { INodeProperties } from 'n8n-workflow';

export const motivoRetiroOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['motivoRetiro'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista motivos de retiro.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un motivo específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo motivo de retiro.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un motivo existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un motivo.' },
        ],
        default: 'getAll',
    },
];

export const motivoRetiroFields: INodeProperties[] = [
    {
        displayName: 'ID Motivo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['motivoRetiro'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código numérico del motivo de retiro (codMotivo).',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['motivoRetiro'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar. Ej: { "descripcion": "Venta Interna", "ventaInterna": true }.',
    },
];