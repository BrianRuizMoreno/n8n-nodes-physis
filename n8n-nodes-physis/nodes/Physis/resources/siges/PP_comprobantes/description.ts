import { INodeProperties } from 'n8n-workflow';

export const PP_comprobantesOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['PP_comprobantes'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Lista de comprobantes (filtros disponibles)', action: 'Listar todos a p p comprobantes',},
            { name: 'Listar Mis Comprobantes', value: 'getMe', description: 'GET Comprobantes propios del usuario' , action: 'Listar mis comprobantes a p p comprobantes',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de un comprobante', action: 'Obtener por id a p p comprobantes',},
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo comprobante', action: 'Crear a p p comprobantes',},
            { name: 'Modificar (Patch)', value: 'patch', description: 'PATCH Actualiza parcialmente un comprobante', action: 'Modificar patch a p p comprobantes',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un comprobante', action: 'Eliminar a p p comprobantes',},
            { name: 'Estados: Listar Todos', value: 'getEstados', description: 'GET Lista de estados posibles', action: 'Estados listar todos a p p comprobantes',},
            { name: 'Estados: Mis Posibles', value: 'getPosiblesEstados', description: 'GET Estados a los que el usuario puede cambiar' , action: 'Estados mis posibles a p p comprobantes',},
            { name: 'Estados: Consulta Historial', value: 'tableSearchEstados', description: 'POST Consulta historial de estados', action: 'Estados consulta historial a p p comprobantes',},
            { name: 'Autorizantes', value: 'getAutorizantes', description: 'GET Lista de autorizantes para el comprobante', action: 'Autorizantes a p p comprobantes',},
            { name: 'Mensajes: Listar', value: 'getMessages', description: 'GET Mensajes asociados al comprobante', action: 'Mensajes listar a p p comprobantes',},
            { name: 'Mensajes: Agregar', value: 'addMessage', description: 'POST Agrega un mensaje al hilo' , action: 'Mensajes agregar a p p comprobantes',},
            { name: 'PDF: Descargar', value: 'getPdf', description: 'GET Descarga el PDF del comprobante', action: 'Pdf descargar a p p comprobantes',},
            { name: 'Archivos: Listar Adjuntos', value: 'getFiles', description: 'GET Lista de archivos adjuntos' , action: 'Archivos listar adjuntos a p p comprobantes',},
            { name: 'Archivos: Subir PDF (QR)', value: 'uploadPdf', description: 'POST Sube PDF y procesa QR', action: 'Archivos subir pdf qr a p p comprobantes',},
            { name: 'Listar Módulos', value: 'getModulos', description: 'GET Lista de módulos disponibles', action: 'Listar m dulos a p p comprobantes',},
        ],
        default: 'getAll',
    },
];

export const PP_comprobantesFields: INodeProperties[] = [
    {
        displayName: 'ID Comprobante (Aut)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['PP_comprobantes'], 
                operation: ['get', 'patch', 'delete', 'getPosiblesEstados', 'tableSearchEstados', 'getAutorizantes', 'getMessages', 'addMessage', 'getPdf', 'getFiles'] 
            } 
        },
        description: 'Identificador del comprobante (idComprobanteAut)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['PP_comprobantes'] 
            } 
        },
        description: 'Cuerpo para Crear/Patch/Mensaje o Filtros para Listar',
    },
];