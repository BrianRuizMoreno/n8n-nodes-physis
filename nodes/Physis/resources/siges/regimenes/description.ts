import { INodeProperties } from 'n8n-workflow';

export const tipoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tipo'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Devuelve todos los regímenes', action: 'Listar todos a tipo',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve un régimen específico' , action: 'Obtener por ID a tipo',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo régimen', action: 'Crear a tipo',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un régimen existente', action: 'Actualizar a tipo',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un régimen por ID', action: 'Eliminar a tipo',},
            { name: 'Obtener Por Cta Ppal', value: 'getByPpal', description: 'GET Devuelve régimen asociado a una Cuenta Principal', action: 'Obtener por cta ppal a tipo',},
            { name: 'Asociar a Cta Ppal', value: 'associatePpal', description: 'POST Asocia un régimen a una cuenta principal', action: 'Asociar a cta ppal a tipo',},
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
        description: 'ID del Régimen (para Get/Delete) o ID de Cuenta Principal (para GetByPpal)',
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
        description: 'Cuerpo para Crear/Actualizar o para la Asociación',
    },
];