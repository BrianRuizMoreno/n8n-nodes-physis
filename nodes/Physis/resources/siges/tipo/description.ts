import { INodeProperties } from 'n8n-workflow';

export const tipoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tipo'] } },
        options: [

			{ name: 'Listar Todos', value: 'getAll', description: 'GET Devuelve todos los regímenes.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Devuelve un régimen específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo régimen.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un régimen existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un régimen por ID.' },
            { name: 'Obtener por Cta Ppal', value: 'getByPpal', description: 'GET Devuelve régimen asociado a una Cuenta Principal.' },
            { name: 'Asociar a Cta Ppal', value: 'associatePpal', description: 'POST Asocia un régimen a una cuenta principal.' },
        ],
        default: 'getAll',
    },
];

export const tipoFields: INodeProperties[] = [
    {
        displayName: 'ID Regimen / Cta Ppal',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tipo'], 
                operation: ['get', 'delete', 'getByPpal'] 
            } 
        },
        description: 'ID del Régimen (para Get/Delete) o ID de Cuenta Principal (para GetByPpal).',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tipo'],
                operation: ['create', 'update', 'associatePpal']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o para la Asociación.',
    },
];