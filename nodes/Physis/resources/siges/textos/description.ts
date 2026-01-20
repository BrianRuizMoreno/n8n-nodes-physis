import { INodeProperties } from 'n8n-workflow';

export const textosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['textos'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Devuelve la lista de textos predefinidos, filtrados por categoría',                
                action: 'Listar Textos a textos',
            },
            { 
                name: 'Obtener Texto', 
                value: 'get', 
                description: 'GET Recupera el contenido de una plantilla específica',                
                action: 'Obtener Texto a textos',
            },
            { 
                name: 'Crear Texto', 
                value: 'create', 
                description: 'POST Agrega una nueva leyenda o plantilla al sistema',                 
                action: 'Crear Texto a textos',
            },
            { 
                name: 'Modificar Texto', 
                value: 'update', 
                description: 'PUT Actualiza el contenido de un texto existente',                 
                action: 'Modificar Texto a textos',
            },
            { 
                name: 'Eliminar Texto', 
                value: 'delete', 
                description: 'DELETE Borra un texto predefinido',                
                action: 'Eliminar Texto a textos',
            },
        ],
        default: 'getAll',
    },
];

export const textosFields: INodeProperties[] = [

    {
        displayName: 'ID Texto',
        name: 'idTexto',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['textos'],
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador único de la plantilla de texto',
    },
    {
        displayName: 'Tipo De Texto (ID)',
        name: 'tipoTexto',
        type: 'number',
        default: 0,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['textos'],
                operation: ['getAll'] 
            } 
        },
        description: '0 para traer todos, o el ID de la categoría (ej: 1=Observaciones Factura, 5=Mail Cobranzas)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{\n  "tipoTexto": 1,\n  "descripcion": "Leyenda Fiscal",\n  "texto": "Recibí conforme el...",\n  "porDefecto": false\n}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['textos'],
                operation: ['create', 'update'] 
            } 
        },
        description: 'Estructura del texto a guardar',
    },
];