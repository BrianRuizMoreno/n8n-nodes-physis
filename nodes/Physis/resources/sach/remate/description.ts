import { INodeProperties } from 'n8n-workflow';

export const remateOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['remate'] } },
        options: [

            { name: 'Listar Remates', value: 'getAllRemates', description: 'GET Lista de remates feria.' },
            { name: 'Obtener Remate', value: 'getRemate', description: 'GET Detalle de un remate.' },
            { name: 'Corrales del Remate', value: 'getRemateCorrales', description: 'GET Corrales asignados al remate.' },
            { name: 'Listar Descargas', value: 'getAllDescargas', description: 'GET Lista boletas de descarga.' },
            { name: 'Obtener Descarga', value: 'getDescarga', description: 'GET Detalle boleta de descarga.' },
            { name: 'Pendientes Embretar', value: 'getPendientesEmbretar', description: 'GET Descargas pendientes de asignar a lote.' },
            { name: 'Crear Descarga', value: 'createDescarga', description: 'POST Inserta boleta de descarga.' },
            { name: 'Eliminar Descarga', value: 'deleteDescarga', description: 'DELETE Elimina boleta de descarga.' },
            { name: 'Listar Imágenes Descarga', value: 'getImagenesDescarga', description: 'GET Imágenes asociadas a una descarga.' },
            { name: 'Guardar Imagen', value: 'saveImagen', description: 'POST Inserta imagen de descarga.' },
            { name: 'Eliminar Imagen', value: 'deleteImagen', description: 'DELETE Elimina imagen de descarga.' },
            { name: 'Listar Embretes', value: 'getAllEmbretes', description: 'GET Lista de embretes del remate.' },
            { name: 'Obtener Embrete', value: 'getEmbrete', description: 'GET Detalle de un embrete.' },
            { name: 'Consulta Embretes', value: 'getEmbretesConsulta', description: 'GET Filtra embretes (pendientes/comprados).' },
            { name: 'Crear Embrete', value: 'createEmbrete', description: 'POST Crea un nuevo embrete.' },
            { name: 'Eliminar Embrete', value: 'deleteEmbrete', description: 'DELETE Elimina un embrete.' },
            { name: 'Ver Orden Venta', value: 'getOrdenVenta', description: 'GET Lista ordenada de embretes.' },
            { name: 'Generar Orden Venta', value: 'generateOrdenVenta', description: 'POST Genera orden automático.' },
            { name: 'Guardar Orden Embrete', value: 'saveOrdenEmbrete', description: 'PUT Fija el orden manual de un embrete.' },
            { name: 'Remates Pendientes', value: 'getRematesPendientes', description: 'GET Embretes pendientes de vender.' },
            { name: 'Remates Comprados', value: 'getRematesComprados', description: 'GET Embretes ya vendidos.' },
            { name: 'Obtener Boleta Remate', value: 'getBoletaRemate', description: 'GET Detalle de venta.' },
            { name: 'Asignar Comprador (Venta)', value: 'createBoletaRemate', description: 'POST Asigna comprador (cierra venta).' },
            { name: 'Desasignar Comprador', value: 'deleteBoletaRemate', description: 'DELETE Anula venta/asignación.' },
            { name: 'Modificar Kilos', value: 'updateKilosRemate', description: 'PUT Ajusta kilos de la venta.' },
        ],
        default: 'getAllRemates',
    },
];

export const remateFields: INodeProperties[] = [
    {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['remate'], 
                operation: [
                    'getRemate', 'getRemateCorrales', 'getDescarga', 
                    'getCorral', 'getEmbrete', 'getBoletaRemate', 
                    'getImagenDescarga'
                ] 
            } 
        },
        description: 'ID del recurso (Remate, Descarga, Embrete, Imagen, etc. según operación).',
    },
    {
        displayName: 'JSON Body / Parámetros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['remate']
            } 
        },
        description: 'Cuerpo para Crear/Update o Query String para Listados (IdPuestoCarga, IdRemateFeria, Filtros).',
    },
];