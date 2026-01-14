import { INodeProperties } from 'n8n-workflow';

export const conductorOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['conductor'] } },
        options: [
            // --- CONSULTAS ---
            { 
                name: 'Listar (Búsqueda)', 
                value: 'getAll', 
                description: 'GET Listar conductores (SIFAC). Filtros JSON: { "consulta": "..." }.' 
            },
            { 
                name: 'Listar Grilla (Kendo)', 
                value: 'getGrid', 
                description: 'GET Vista para grilla Kendo (SACER).' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Detalle de un conductor. Filtros JSON opcionales: { "idTransportista": 123 }.' 
            },
            // --- GESTIÓN ---
            { 
                name: 'Crear', 
                value: 'create', 
                description: 'POST Crear nuevo conductor. Body JSON requerido.' 
            },
            { 
                name: 'Modificar', 
                value: 'update', 
                description: 'PUT Modificar conductor existente. Body JSON requerido.' 
            },
            { 
                name: 'Eliminar', 
                value: 'delete', 
                description: 'DELETE Eliminar un conductor por su ID.' 
            },
        ],
        default: 'getAll',
    },
];

export const conductorFields: INodeProperties[] = [
    {
        displayName: 'ID Conductor',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['conductor'], 
                operation: [
                    'get', 
                    'update',
                    'delete'
                ] 
            } 
        },
        description: 'Identificador único del conductor (idConductor).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['conductor'] 
            } 
        },
        description: 'Cuerpo para POST/PUT (Body) o Filtros para GET (Query String).',
    },
];