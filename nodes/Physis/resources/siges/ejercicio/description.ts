import { INodeProperties } from 'n8n-workflow';

export const ejercicioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['ejercicio'] } },
        options: [

			{ name: 'Listar Todos', value: 'getAll', description: 'GET Lista ejercicios. Filtro: { "fecha": "YYYY-MM-DD" }.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de un ejercicio.' },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo ejercicio.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un ejercicio.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE (Deshabilitado según doc).' },
            { name: 'Ejercicio Actual (Get)', value: 'getActual', description: 'GET Ejercicio seleccionado por el usuario.' },
            { name: 'Ejercicio Actual (Set)', value: 'setActual', description: 'PUT Cambia el ejercicio actual del usuario.' },
            { name: 'Diarios: Parámetros', value: 'getDiariosParametros', description: 'GET Parámetros de libro diario.' },
            { name: 'Diarios: Comprobantes', value: 'getDiariosComprobantes', description: 'GET Lista comprobantes para libro diario.' },
            { name: 'Diarios: Primer Comprobante', value: 'getDiarioPrimero', description: 'GET Primer comprobante del libro.' },
        ],
        default: 'getAll',
    },
];

export const ejercicioFields: INodeProperties[] = [
    {
        displayName: 'ID Ejercicio',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['ejercicio'], 
                operation: ['get', 'setActual'] 
            } 
        },
        description: 'Identificador del ejercicio contable.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['ejercicio'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listas (ej: {"idLibro": 1}).',
    },
];