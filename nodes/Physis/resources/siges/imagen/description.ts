import { INodeProperties } from 'n8n-workflow';

export const imagenOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['imagen'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Lista imágenes de un comprobante' 
																																																action: 'Imágenes: Listar an imagen',},
            { name: 'Imágenes: Obtener', value: 'get', description: 'GET Descarga una imagen específica' 
																																																							action: 'Imágenes: Obtener an imagen',},
            { name: 'Imágenes: Insertar', value: 'create', description: 'POST Sube una nueva imagen' 
																																																											action: 'Imágenes: Insertar an imagen',},
            { name: 'Imágenes: Actualizar', value: 'update', description: 'PUT Actualiza datos de una imagen' 
																																																													action: 'Imágenes: Actualizar an imagen',},
            { name: 'Imágenes: Eliminar', value: 'delete', description: 'DELETE Borra una imagen' 
																																																											action: 'Imágenes: Eliminar an imagen',},
            { name: 'PDF: Comprobante', value: 'getPdfComprobante', description: 'GET Descarga PDF del comprobante' 
																																																																				action: 'PDF: Comprobante an imagen',},
            { name: 'PDF: AFIP', value: 'getPdfAfip', description: 'GET Descarga PDF liquidación AFIP' 
																																																						action: 'PDF: AFIP an imagen',},
            { name: 'PDF: OPRC Detalle', value: 'getPdfOprc', description: 'GET Descarga PDF detalle OPRC' 
																																																														action: 'PDF: OPRC Detalle an imagen',},
            { name: 'Certificados: Listar', value: 'getCertificadosList', description: 'GET Lista certificados de retención' 
																																																																										action: 'Certificados: Listar an imagen',},
            { name: 'Certificados: PDF', value: 'getPdfCertificado', description: 'GET Descarga PDF de un certificado' 
																																																																					action: 'Certificados: PDF an imagen',},
        ],
        default: 'getAll',
    },
];

export const imagenFields: INodeProperties[] = [
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['imagen'] 
            } 
        },
        description: 'Año/Ejercicio del comprobante',
    },
    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['imagen'] 
            } 
        },
        description: 'Identificador del comprobante',
    },
    {
        displayName: 'ID Imagen',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['imagen'],
                operation: ['get', 'update', 'delete']
            } 
        },
        description: 'Identificador de la imagen',
    },
    {
        displayName: 'ID Secuencia (Certificado)',
        name: 'idSecuencia',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['imagen'],
                operation: ['getPdfCertificado']
            } 
        },
        description: 'Secuencia del certificado a descargar',
    },
    {
        displayName: 'JSON Body / Params',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['imagen'],
                operation: ['create', 'update']
            } 
        },
        description: 'Parámetros adicionales (extension, descripcion)',
    },
];