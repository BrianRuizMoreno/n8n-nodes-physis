import { INodeProperties } from 'n8n-workflow';

export const firmasOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['firmas'] } },
        options: [
            { 
                name: 'Obtener Firma', 
                value: 'get', 
                description: 'GET Recupera una firma digitalizada y sus adjuntos',
                action: 'Obtener Firma a firmas',
            },
            { 
                name: 'Guardar Firma', 
                value: 'create', 
                description: 'POST Guarda una nueva firma junto con hasta 2 imágenes de respaldo (DNI/Lugar)',
                action: 'Guardar Firma a firmas',
            },
        ],
        default: 'get',
    },
];

export const firmasFields: INodeProperties[] = [

    {
        displayName: 'Código De Firma',
        name: 'codFirma',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['get'] 
            } 
        },
        description: 'ID único de la firma a consultar',
    },
    {
        displayName: 'Incluir Archivos',
        name: 'incluirArchivos',
        type: 'boolean',
        default: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['get'] 
            } 
        },
        description: 'Si es true, devuelve el contenido binario (Base64) de las imágenes',
    },
    {
        displayName: 'Nombre Firmante',
        name: 'nombreFirmante',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['create'] 
            } 
        },
    },
    {
        displayName: 'Apellido Firmante',
        name: 'apellidoFirmante',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['create'] 
            } 
        },
    },
    {
        displayName: 'Datos Adicionales (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{\n  "NumeroDocumento": "",\n  "IdTipoDocumento": "96",\n  "CoordenadaX": 0,\n  "CoordenadaY": 0\n}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['create'] 
            } 
        },
        description: 'Metadatos adicionales como ubicación GPS o documento',
    },
    {
        displayName: 'Propiedad Binaria: Firma (Imagen)',
        name: 'binaryPropertyFirma',
        type: 'string',
        default: 'data',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['create'] 
            } 
        },
        description: 'Campo que contiene la imagen principal de la firma',
    },
    {
        displayName: 'Propiedad Binaria: Extra 1 (Imagen2)',
        name: 'binaryPropertyImg2',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['create'] 
            } 
        },
        description: 'Opcional. Campo para foto del lugar o DNI Frente.',
    },
    {
        displayName: 'Propiedad Binaria: Extra 2 (Imagen3)',
        name: 'binaryPropertyImg3',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['firmas'],
                operation: ['create'] 
            } 
        },
        description: 'Opcional. Campo para foto del DNI Reverso.',
    },
];