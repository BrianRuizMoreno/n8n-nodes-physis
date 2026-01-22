"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remateFields = exports.remateOperations = void 0;
exports.remateOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['remate'] } },
        options: [
            { name: 'Listar Remates', value: 'getAllRemates', description: 'GET Lista de remates feria', action: 'Listar remates a remate', },
            { name: 'Obtener Remate', value: 'getRemate', description: 'GET Detalle de un remate', action: 'Obtener remate a remate', },
            { name: 'Corrales Del Remate', value: 'getRemateCorrales', description: 'GET Corrales asignados al remate', action: 'Corrales del remate a remate', },
            { name: 'Listar Descargas', value: 'getAllDescargas', description: 'GET Lista boletas de descarga', action: 'Listar descargas a remate', },
            { name: 'Obtener Descarga', value: 'getDescarga', description: 'GET Detalle boleta de descarga', action: 'Obtener descarga a remate', },
            { name: 'Pendientes Embretar', value: 'getPendientesEmbretar', description: 'GET Descargas pendientes de asignar a lote', action: 'Pendientes embretar a remate', },
            { name: 'Crear Descarga', value: 'createDescarga', description: 'POST Inserta boleta de descarga', action: 'Crear descarga a remate', },
            { name: 'Eliminar Descarga', value: 'deleteDescarga', description: 'DELETE Elimina boleta de descarga', action: 'Eliminar descarga a remate', },
            { name: 'Listar Imágenes Descarga', value: 'getImagenesDescarga', description: 'GET Imágenes asociadas a una descarga', action: 'Listar im genes descarga a remate', },
            { name: 'Guardar Imagen', value: 'saveImagen', description: 'POST Inserta imagen de descarga', action: 'Guardar imagen a remate', },
            { name: 'Eliminar Imagen', value: 'deleteImagen', description: 'DELETE Elimina imagen de descarga', action: 'Eliminar imagen a remate', },
            { name: 'Listar Embretes', value: 'getAllEmbretes', description: 'GET Lista de embretes del remate', action: 'Listar embretes a remate', },
            { name: 'Obtener Embrete', value: 'getEmbrete', description: 'GET Detalle de un embrete', action: 'Obtener embrete a remate', },
            { name: 'Consulta Embretes', value: 'getEmbretesConsulta', description: 'GET Filtra embretes (pendientes/comprados)', action: 'Consulta embretes a remate', },
            { name: 'Crear Embrete', value: 'createEmbrete', description: 'POST Crea un nuevo embrete', action: 'Crear embrete a remate', },
            { name: 'Eliminar Embrete', value: 'deleteEmbrete', description: 'DELETE Elimina un embrete', action: 'Eliminar embrete a remate', },
            { name: 'Ver Orden Venta', value: 'getOrdenVenta', description: 'GET Lista ordenada de embretes', action: 'Ver orden venta a remate', },
            { name: 'Generar Orden Venta', value: 'generateOrdenVenta', description: 'POST Genera orden automático', action: 'Generar orden venta a remate', },
            { name: 'Guardar Orden Embrete', value: 'saveOrdenEmbrete', description: 'PUT Fija el orden manual de un embrete', action: 'Guardar orden embrete a remate', },
            { name: 'Remates Pendientes', value: 'getRematesPendientes', description: 'GET Embretes pendientes de vender', action: 'Remates pendientes a remate', },
            { name: 'Remates Comprados', value: 'getRematesComprados', description: 'GET Embretes ya vendidos', action: 'Remates comprados a remate', },
            { name: 'Obtener Boleta Remate', value: 'getBoletaRemate', description: 'GET Detalle de venta', action: 'Obtener boleta remate a remate', },
            { name: 'Asignar Comprador (Venta)', value: 'createBoletaRemate', description: 'POST Asigna comprador (cierra venta)', action: 'Asignar comprador venta a remate', },
            { name: 'Desasignar Comprador', value: 'deleteBoletaRemate', description: 'DELETE Anula venta/asignación', action: 'Desasignar comprador a remate', },
            { name: 'Modificar Kilos', value: 'updateKilosRemate', description: 'PUT Ajusta kilos de la venta', action: 'Modificar kilos a remate', },
        ],
        default: 'getAllRemates',
    },
];
exports.remateFields = [
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
        description: 'Cuerpo para Crear/Update o Query String para Listados (IdPuestoCarga, IdRemateFeria, Filtros)',
    },
];
//# sourceMappingURL=description.js.map