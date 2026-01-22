"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmFields = exports.crmOperations = void 0;
exports.crmOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['crm'] } },
        options: [
            { name: 'Listar Actividades', value: 'getActivities', description: 'GET Obtiene actividades (filtro por Evento/Detalle)', action: 'Listar actividades a crm', },
            { name: 'Crear Actividad', value: 'createActivity', description: 'POST Crea una nueva actividad', action: 'Crear actividad a crm', },
            { name: 'Actualizar Actividad', value: 'updateActivity', description: 'PUT Actualiza una actividad existente', action: 'Actualizar actividad a crm', },
            { name: 'Eliminar Actividad', value: 'deleteActivity', description: 'DELETE Elimina una actividad', action: 'Eliminar actividad a crm', },
            { name: 'Listar Contactos', value: 'getContacts', description: 'GET Lista todos los contactos', action: 'Listar contactos a crm', },
            { name: 'Crear/Actualizar Contacto', value: 'upsertContact', description: 'POST Inserta o actualiza un contacto', action: 'Crear actualizar contacto a crm', },
            { name: 'Listar Clientes', value: 'getClients', description: 'GET Lista básica de clientes', action: 'Listar clientes a crm', },
            { name: 'Listar Negocios', value: 'getDeals', description: 'GET Lista negocios con múltiples filtros', action: 'Listar negocios a crm', },
            { name: 'Detalle Negocio Y Actividades', value: 'getDealDetail', description: 'GET Obtiene un negocio y sus actividades', action: 'Detalle negocio y actividades a crm', },
            { name: 'Negocios Por Cliente', value: 'getDealsByClient', description: 'GET Negocios asociados a un cliente específico', action: 'Negocios por cliente a crm', },
            { name: 'Crear Negocio', value: 'createDeal', description: 'POST Inserta un negocio y su actividad inicial', action: 'Crear negocio a crm', },
            { name: 'Actualizar Negocio', value: 'updateDeal', description: 'PUT Actualiza datos de un negocio', action: 'Actualizar negocio a crm', },
            { name: 'Eliminar Negocio', value: 'deleteDeal', description: 'DELETE Elimina un negocio y sus actividades', action: 'Eliminar negocio a crm', },
            { name: 'Listar Archivos (Negocio)', value: 'getDocuments', description: 'GET Lista archivos adjuntos a un negocio', action: 'Listar archivos negocio a crm', },
            { name: 'Subir Archivos', value: 'uploadDocuments', description: 'POST Adjunta archivos a un negocio', action: 'Subir archivos a crm', },
            { name: 'Obtener Metadatos Archivo', value: 'getDocumentMeta', description: 'GET Obtiene nombre y extensión de un archivo', action: 'Obtener metadatos archivo a crm', },
            { name: 'Descargar Archivo', value: 'downloadDocument', description: 'GET Descarga el contenido del archivo', action: 'Descargar archivo a crm', },
            { name: 'Eliminar Archivo', value: 'deleteDocument', description: 'DELETE Elimina un archivo adjunto', action: 'Eliminar archivo a crm', },
        ],
        default: 'getDeals',
    },
];
exports.crmFields = [
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
//# sourceMappingURL=description.js.map