import { INodeProperties } from 'n8n-workflow';

export const transporteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['transporte'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista transportes (filtro por subsistema)', action: 'Listar Todos a transporte',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura jerárquica de transportes', action: 'Listar Árbol a transporte',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un transporte específico', action: 'Obtener por ID a transporte',},
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo transporte', action: 'Crear a transporte',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un transporte existente', action: 'Actualizar a transporte',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un transporte', action: 'Eliminar a transporte',},
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
        description: 'Identificador de la cuenta auxiliar del transporte',
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
        description: 'Cuerpo para Crear/Actualizar o Filtros Query String (subSistema, cuentaPadre, idAuxi, etc.)',
    },
];