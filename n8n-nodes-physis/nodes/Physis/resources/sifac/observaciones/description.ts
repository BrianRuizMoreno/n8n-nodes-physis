import { INodeProperties } from 'n8n-workflow';

export const observacionesOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['observaciones'] } },
        options: [

            { 
                name: 'Listar Árbol', 
                value: 'getArbol', 
                description: 'GET Estructura jerárquica de observaciones. Filtros JSON: { "imputables": true }.',
                action: 'Listar rbol an observaciones',
            },
            { 
                name: 'Crear', 
                value: 'create', 
                description: 'POST Crear nueva observación/nota. Body JSON requerido.',
                action: 'Crear an observaciones',
            },
            { 
                name: 'Modificar', 
                value: 'update', 
                description: 'PUT Modificar observación existente. Body JSON requerido.',
                action: 'Modificar an observaciones',
            },
            { 
                name: 'Eliminar', 
                value: 'delete', 
                description: 'DELETE Eliminar observación por su ID',
                action: 'Eliminar an observaciones',
            },
        ],
        default: 'getArbol',
    },
];

export const observacionesFields: INodeProperties[] = [
    {
        displayName: 'ID Observación',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['observaciones'], 
                operation: [
                    'delete'
                ] 
            } 
        },
        description: 'Identificador único de la observación (idCtaReagAuxi)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['observaciones'] 
            } 
        },
        description: 'Cuerpo para POST/PUT (Body) o Filtros para GET (Query String)',
    },
];