import { INodeProperties } from 'n8n-workflow';

export const crmOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['crm'] } },
        options: [

            { name: 'Listar Actividades', value: 'getActivities', description: 'GET Obtiene actividades (filtro por Evento/Detalle)', action: 'Listar Actividades a crm',},
            { name: 'Crear Actividad', value: 'createActivity', description: 'POST Crea una nueva actividad', action: 'Crear Actividad a crm',},
            { name: 'Actualizar Actividad', value: 'updateActivity', description: 'PUT Actualiza una actividad existente', action: 'Actualizar Actividad a crm',},
            { name: 'Eliminar Actividad', value: 'deleteActivity', description: 'DELETE Elimina una actividad', action: 'Eliminar Actividad a crm',},
            { name: 'Listar Contactos', value: 'getContacts', description: 'GET Lista todos los contactos', action: 'Listar Contactos a crm',},
            { name: 'Crear/Actualizar Contacto', value: 'upsertContact', description: 'POST Inserta o actualiza un contacto', action: 'Crear/Actualizar Contacto a crm',},
            { name: 'Listar Clientes', value: 'getClients', description: 'GET Lista básica de clientes', action: 'Listar Clientes a crm',},
            { name: 'Listar Negocios', value: 'getDeals', description: 'GET Lista negocios con múltiples filtros', action: 'Listar Negocios a crm',},
            { name: 'Detalle Negocio Y Actividades', value: 'getDealDetail', description: 'GET Obtiene un negocio y sus actividades', action: 'Detalle Negocio y Actividades a crm',},
            { name: 'Negocios Por Cliente', value: 'getDealsByClient', description: 'GET Negocios asociados a un cliente específico', action: 'Negocios por Cliente a crm',},
            { name: 'Crear Negocio', value: 'createDeal', description: 'POST Inserta un negocio y su actividad inicial', action: 'Crear Negocio a crm',},
            { name: 'Actualizar Negocio', value: 'updateDeal', description: 'PUT Actualiza datos de un negocio', action: 'Actualizar Negocio a crm',},
            { name: 'Eliminar Negocio', value: 'deleteDeal', description: 'DELETE Elimina un negocio y sus actividades', action: 'Eliminar Negocio a crm',},
            { name: 'Listar Archivos (Negocio)', value: 'getDocuments', description: 'GET Lista archivos adjuntos a un negocio', action: 'Listar Archivos (Negocio) a crm',},
            { name: 'Subir Archivos', value: 'uploadDocuments', description: 'POST Adjunta archivos a un negocio', action: 'Subir Archivos a crm',},
            { name: 'Obtener Metadatos Archivo', value: 'getDocumentMeta', description: 'GET Obtiene nombre y extensión de un archivo', action: 'Obtener Metadatos Archivo a crm',},
            { name: 'Descargar Archivo', value: 'downloadDocument', description: 'GET Descarga el contenido del archivo', action: 'Descargar Archivo a crm',},
            { name: 'Eliminar Archivo', value: 'deleteDocument', description: 'DELETE Elimina un archivo adjunto', action: 'Eliminar Archivo a crm',},
        ],
        default: 'getDeals',
    },
];

export const crmFields: INodeProperties[] = [

    {
        displayName: 'ID Negocio / Evento',
        name: 'idNegocio',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm'],
                operation: [
                    'deleteActivity', 
                    'getDealDetail', 
                    'deleteDeal',
                    'getDocuments',
                    'uploadDocuments',
                    'getDocumentMeta',
                    'downloadDocument',
                    'deleteDocument'
                ] 
            } 
        },
        description: 'Identificador del Negocio (o Evento)',
    },
    {
        displayName: 'ID Actividad',
        name: 'idActividad',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm'], 
                operation: ['deleteActivity'] 
            } 
        },
        description: 'Identificador de la actividad a eliminar',
    },
    {
        displayName: 'ID Auxi (Cliente)',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm'], 
                operation: ['getDealsByClient'] 
            } 
        },
        description: 'ID Auxiliar del cliente',
    },
    {
        displayName: 'ID Cta Auxi (Cliente)',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm'], 
                operation: ['getDealsByClient'] 
            } 
        },
        description: 'Código de cuenta auxiliar del cliente',
    },
    {
        displayName: 'ID Documento',
        name: 'idDocumento',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm'], 
                operation: ['getDocumentMeta', 'downloadDocument', 'deleteDocument'] 
            } 
        },
        description: 'Identificador del documento/archivo',
    },
    {
        displayName: 'Nombre Archivo',
        name: 'nombreArchivo',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm'], 
                operation: ['deleteDocument'] 
            } 
        },
        description: 'Nombre del archivo a eliminar (requerido por la API)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['crm']
            },
            hide: {
                operation: [
                    'getClients', 
                    'deleteActivity', 
                    'deleteDeal', 
                    'getDealsByClient',
                    'getDocuments',
                    'getDocumentMeta',
                    'downloadDocument',
                    'deleteDocument'
                ]
            }
        },
        description: 'Cuerpo para Crear/Actualizar (Actividades, Contactos, Negocios) o Filtros para Listados (Negocios, Actividades, Contactos)',
    },
];