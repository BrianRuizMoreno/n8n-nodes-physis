import { INodeProperties } from 'n8n-workflow';

export const PP_compradoresAutorizantesOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['PP_compradoresAutorizantes'] } },
        options: [

            { name: 'Get Many', value: 'getAll', description: 'GET Lista compradores. Filtro opcional: { conAutorizantes: true }.', action: 'Listar compradores a p p compradores autorizantes',},
            { name: 'Obtener Configuración', value: 'getSettings', description: 'GET Configuración global de compradores', action: 'Obtener configuraci n a p p compradores autorizantes',},
            { name: 'Guardar Configuración', value: 'saveSettings', description: 'POST Guarda configuración global', action: 'Guardar configuraci n a p p compradores autorizantes',},
            { name: 'Listar Relaciones (Global)', value: 'getAllAutorizantes', description: 'GET Todas las relaciones Comprador-Autorizante', action: 'Listar relaciones global a p p compradores autorizantes',},
            { name: 'Autorizantes de Comprador', value: 'getAutorizantes', description: 'GET Autorizantes de un comprador específico', action: 'Autorizantes de comprador a p p compradores autorizantes',},
            { name: 'Agregar Autorizante', value: 'addAutorizante', description: 'POST Agrega un autorizante a un comprador', action: 'Agregar autorizante a p p compradores autorizantes',},
            { name: 'Agregar Lista Autorizantes', value: 'addAutorizanteList', description: 'POST Agrega múltiples autorizantes', action: 'Agregar lista autorizantes a p p compradores autorizantes',},
            { name: 'Modificar Autorizante', value: 'updateAutorizante', description: 'PATCH Modifica relación (importe, nivel)', action: 'Modificar autorizante a p p compradores autorizantes',},
            { name: 'Eliminar Autorizante', value: 'deleteAutorizante', description: 'DELETE Elimina un autorizante de un comprador', action: 'Eliminar autorizante a p p compradores autorizantes',},
        ],
        default: 'getAll',
    },
];

export const PP_compradoresAutorizantesFields: INodeProperties[] = [
    {
        displayName: 'ID Comprador (CtaReag)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['PP_compradoresAutorizantes'], 
                operation: ['getAutorizantes', 'addAutorizante', 'addAutorizanteList', 'updateAutorizante', 'deleteAutorizante'] 
            } 
        },
        description: 'ID de la Cuenta de Reagrupación del Comprador',
    },
    {
        displayName: 'ID Autorizante',
        name: 'idAutorizante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['PP_compradoresAutorizantes'], 
                operation: ['updateAutorizante', 'deleteAutorizante'] 
            } 
        },
        description: 'ID del usuario autorizante',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['PP_compradoresAutorizantes'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar',
    },
];