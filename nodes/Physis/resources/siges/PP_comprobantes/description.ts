import { INodeProperties } from 'n8n-workflow';

export const PP_comprobantesOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['PP_comprobantes'] } },
        options: [

			{ name: 'Listar Todos', value: 'getAll', description: 'GET Lista de comprobantes (filtros disponibles).' },
            { name: 'Listar Mis Comprobantes', value: 'getMe', description: 'GET Comprobantes propios del usuario.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de un comprobante.' },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo comprobante.' },
            { name: 'Modificar (Patch)', value: 'patch', description: 'PATCH Actualiza parcialmente un comprobante.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un comprobante.' },
            { name: 'Estados: Listar Todos', value: 'getEstados', description: 'GET Lista de estados posibles.' },
            { name: 'Estados: Mis Posibles', value: 'getPosiblesEstados', description: 'GET Estados a los que el usuario puede cambiar.' },
            { name: 'Estados: Consulta Historial', value: 'tableSearchEstados', description: 'POST Consulta historial de estados.' },
            { name: 'Autorizantes', value: 'getAutorizantes', description: 'GET Lista de autorizantes para el comprobante.' },
            { name: 'Mensajes: Listar', value: 'getMessages', description: 'GET Mensajes asociados al comprobante.' },
            { name: 'Mensajes: Agregar', value: 'addMessage', description: 'POST Agrega un mensaje al hilo.' },
            { name: 'PDF: Descargar', value: 'getPdf', description: 'GET Descarga el PDF del comprobante.' },
            { name: 'Archivos: Listar Adjuntos', value: 'getFiles', description: 'GET Lista de archivos adjuntos.' },
            { name: 'Archivos: Subir PDF (QR)', value: 'uploadPdf', description: 'POST Sube PDF y procesa QR.' },
            { name: 'Listar Módulos', value: 'getModulos', description: 'GET Lista de módulos disponibles.' },
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
        description: 'Identificador del comprobante (idComprobanteAut).',
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
        description: 'Cuerpo para Crear/Patch/Mensaje o Filtros para Listar.',
    },
];