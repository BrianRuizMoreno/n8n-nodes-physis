import { INodeProperties } from 'n8n-workflow';

export const tipoContratoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['tipoContrato'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista tipos de contrato (filtro opcional).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un tipo de contrato específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de contrato.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de contrato existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de contrato.' },
        ],
        default: 'getAll',
    },
];

export const tipoContratoFields: INodeProperties[] = [
    {
        displayName: 'ID Tipo Contrato',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['tipoContrato'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Código numérico del tipo de contrato (codTipoContrato).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['tipoContrato']
            },
            hide: {
                operation: ['get', 'delete']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar.\n' +
                     'Ej. Listar: { "filtroFijaciones": 1 } (0=Todos, 1=Con Fijación, 2=Sin Fijación).\n' +
                     'Ej. Crear: { "descripcion": "Canje", "fijaciones": true ... }',
    },
];