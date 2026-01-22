import { INodeProperties } from 'n8n-workflow';

export const tipoFormatoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['tipoFormato'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Devuelve todos los tipos de formato', action: 'Listar todos a tipo formato',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve un tipo de formato específico', action: 'Obtener por ID a tipo formato',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de formato', action: 'Crear a tipo formato',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de formato existente', action: 'Actualizar a tipo formato',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de formato', action: 'Eliminar a tipo formato',},
        ],
        default: 'getAll',
    },
];

export const tipoFormatoFields: INodeProperties[] = [
    {
        displayName: 'ID Tipo Formato',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['tipoFormato'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del tipo de formato',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['tipoFormato'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos del tipo de formato (nombre, expresión lógica, vista, etc.)',
    },
];