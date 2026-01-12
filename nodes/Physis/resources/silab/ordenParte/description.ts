import { INodeProperties } from 'n8n-workflow';

export const ordenParteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['ordenParte'] } },
        options: [
            { name: 'Listar (Filtros)', value: 'getAll', description: 'GET Lista de órdenes con filtros opcionales.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de una orden específica.' },
            { name: 'Crear/Modificar', value: 'upsert', description: 'POST Crea o modifica una orden.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una orden.' },
            { name: 'Listar PUMA', value: 'getPuma', description: 'GET Listado de partes PUMA.' },
            { name: 'Listar Eliminados', value: 'getDeleted', description: 'GET Listado de partes eliminados.' },
            { name: 'Items de Estados', value: 'itemsEstados', description: 'POST Modificación masiva de estados de items.' },
            { name: 'Partes de un Empleado', value: 'getByPersonal', description: 'GET Partes asociados a un personal (requiere ID Personal).' },
            { name: 'Items de Partes de un Empleado', value: 'getByItems', description: 'GET Items de partes de un personal (requiere ID Personal).' },
        ],
        default: 'getAll',
    },
];

export const ordenParteFields: INodeProperties[] = [
    {
        displayName: 'ID Orden/Parte/Personal',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['ordenParte'], 
                operation: ['get', 'delete', 'getByPersonal', 'getByItems'] 
            } 
        },
        description: 'ID del recurso principal según la operación (Orden o Personal).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['silab'], 
                resource: ['ordenParte'], 
                operation: ['getAll', 'upsert', 'delete', 'getPuma', 'getDeleted', 'itemsEstados'] 
            } 
        },
        description: 'Cuerpo para POST (upsert) o Query Params para GET (filtros).',
    },
];