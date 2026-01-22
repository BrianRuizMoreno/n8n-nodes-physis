import { INodeProperties } from 'n8n-workflow';

export const ejercicioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['ejercicio'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Lista ejercicios. Filtro: { "fecha": "YYYY-MM-DD" }.', action: 'Listar todos an ejercicio',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de un ejercicio', action: 'Obtener por ID an ejercicio',},
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo ejercicio', action: 'Crear an ejercicio',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un ejercicio', action: 'Actualizar an ejercicio',},
            { name: 'Ejercicio Actual (Get)', value: 'getActual', description: 'GET Ejercicio seleccionado por el usuario' , action: 'Ejercicio actual get an ejercicio',},
            { name: 'Ejercicio Actual (Set)', value: 'setActual', description: 'PUT Cambia el ejercicio actual del usuario' , action: 'Ejercicio actual set an ejercicio',},
            { name: 'Diarios: Parámetros', value: 'getDiariosParametros', description: 'GET Parámetros de libro diario', action: 'Diarios par metros an ejercicio',},
            { name: 'Diarios: Comprobantes', value: 'getDiariosComprobantes', description: 'GET Lista comprobantes para libro diario', action: 'Diarios comprobantes an ejercicio',},
            { name: 'Diarios: Primer Comprobante', value: 'getDiarioPrimero', description: 'GET Primer comprobante del libro', action: 'Diarios primer comprobante an ejercicio',},
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
        description: 'Identificador del ejercicio contable',
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
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listas (ej: {"idLibro": 1})',
    },
];