import { INodeProperties } from 'n8n-workflow';

export const transporteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['transporte'] } },
        options: [
            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista transportes (filtro por subsistema).' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura jerárquica de transportes.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene un transporte específico.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo transporte.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un transporte existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un transporte.' },
        ],
        default: 'getAll',
    },
];

export const transporteFields: INodeProperties[] = [
    {
        displayName: 'ID Transporte (CtaReagAuxi)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['transporte'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador de la cuenta auxiliar del transporte.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['transporte']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros Query String (subSistema, cuentaPadre, idAuxi, etc.).',
    },
];