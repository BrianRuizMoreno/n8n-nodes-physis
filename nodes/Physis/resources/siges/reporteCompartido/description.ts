import { INodeProperties } from 'n8n-workflow';

export const reporteCompartidoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reporteCompartido'] } },
        options: [

            { name: 'Listar Reportes', value: 'getAll', description: 'GET Lista reportes compartidos (filtros opcionales).' },
            { name: 'Obtener Reporte', value: 'get', description: 'GET Detalle de un reporte compartido.' },
            { name: 'Descargar PDF (Reporte)', value: 'getPdf', description: 'GET Binario PDF de reporte compartido.' },
            { name: 'Eliminar Reporte', value: 'delete', description: 'DELETE Elimina un reporte compartido.' },
            { name: 'Listar Grupos', value: 'getGrupos', description: 'GET Grupos de PDFs publicados.' },
            { name: 'Usuarios con Acceso', value: 'getUsuarios', description: 'GET Usuarios asignados a un reporte.' },
            { name: 'PDF de Comprobante', value: 'getComprobantePdf', description: 'GET PDF por Ejercicio/Comprobante.' },
            { name: 'PDF por Link', value: 'getDocumentoPdfByLink', description: 'GET PDF usando un link hash.' },
            { name: 'Generar PDFs en Lote', value: 'generateDocumentosPdf', description: 'PUT Genera archivos PDF en servidor (Desde/Hasta).' },
        ],
        default: 'getAll',
    },
];

export const reporteCompartidoFields: INodeProperties[] = [
    {
        displayName: 'ID Reporte',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['reporteCompartido'], 
                operation: ['get', 'delete', 'getPdf', 'getUsuarios'] 
            } 
        },
        description: 'Identificador del reporte compartido.',
    },
    {
        displayName: 'Link Documento',
        name: 'link',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['reporteCompartido'], 
                operation: ['getDocumentoPdfByLink'] 
            } 
        },
        description: 'Hash o link del documento PDF.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['reporteCompartido'] 
            } 
        },
        description: 'Filtros (fechaDesde, grupo, idUsuario) o Parámetros (IdEjercicio, IdComprobante, idDesde, idHasta).',
    },
];