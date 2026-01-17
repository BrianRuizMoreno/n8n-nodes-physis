import { INodeProperties } from 'n8n-workflow';

export const imagenOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['imagen'] } },
        options: [
            // --- CONSULTAS ---
            { 
                name: 'Listar Por Documento', 
                value: 'getAll', 
                description: 'GET Listar imágenes de una cabecera. Filtros JSON: { "IdCabecera": 123, "origen": 1 }.' 
																action: 'Listar por Documento an imagen',
            },
            { 
                name: 'Obtener Una', 
                value: 'get', 
                description: 'GET Obtener imagen específica. ID=IdImagen. Filtros JSON: { "IdCabecera": 123, "origen": 1 }.' 
																action: 'Obtener Una an imagen',
            },
            // --- GESTIÓN ---
            { 
                name: 'Subir (Insertar)', 
                value: 'create', 
                description: 'POST Subir imagen. JSON debe incluir "payload" con la data y params: { "IdCabecera": 1, "extension": "jpg", "payload": "..." }.' 
																action: 'Subir (Insertar) an imagen',
            },
            { 
                name: 'Actualizar', 
                value: 'update', 
                description: 'PUT Actualizar imagen. JSON con "payload" y params: { "IdCabecera": 1, "IdImagen": 5, "payload": "..." }.' 
																action: 'Actualizar an imagen',
            },
            { 
                name: 'Eliminar', 
                value: 'delete', 
                description: 'DELETE Eliminar imagen. Filtros JSON: { "IdCabecera": 123, "IdImagen": 5, "origen": 1 }.' 
																action: 'Eliminar an imagen',
            },
        ],
        default: 'getAll',
    },
];

export const imagenFields: INodeProperties[] = [
    {
        displayName: 'ID Imagen',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['imagen'], 
                operation: [
                    'get' 
                ] 
            } 
        },
        description: 'Identificador único de la imagen (IdImagen). Solo requerido para "Obtener Una".',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['imagen'] 
            } 
        },
        description: 'Parámetros y contenido. Para POST/PUT, use la propiedad "payload" para el contenido binario/base64 y el resto para metadatos (IdCabecera, extension).',
    },
];