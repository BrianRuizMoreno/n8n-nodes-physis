import { INodeProperties } from 'n8n-workflow';

export const numeradorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['numerador'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los numeradores.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Devuelve un numerador específico.' },
            { name: 'Obtener de Contratos', value: 'getContratos', description: 'GET Devuelve el numerador específico para Contratos.' },
            { name: 'Listar por Planta', value: 'getByPlanta', description: 'GET Numeradores asociados a una planta (filtros opcionales).' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo numerador.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un numerador (Parámetros en JSON Body se envían como Query String).' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un numerador.' },
        ],
        default: 'getAll',
    },
];

export const numeradorFields: INodeProperties[] = [
    {
        displayName: 'ID Numerador',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['numerador'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del numerador.',
    },
    {
        displayName: 'Cód Planta',
        name: 'codPlanta',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['numerador'], 
                operation: ['getByPlanta'] 
            } 
        },
        description: 'Código de la planta para filtrar numeradores.',
    },
    {
        displayName: 'JSON Body / Parámetros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['numerador'],
                operation: ['create', 'update', 'getByPlanta']
            } 
        },
        description: 'Update: { "idNumerador": 1, "idPrefijo": 2, "Numero": 100 }. GetByPlanta: { "idTipoFormato": 0, "formulario": "..." }.',
    },
];