"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partidaFields = exports.partidaOperations = void 0;
exports.partidaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['partida'] } },
        options: [
            { name: 'Listar Partidas (Producto)', value: 'getByProducto', description: 'GET Partidas de un producto', action: 'Listar partidas producto a partida', },
            { name: 'Get Many', value: 'getAll', description: 'GET Búsqueda de partidas', action: 'Listar partidas general a partida', },
            { name: 'Crear Partida', value: 'create', description: 'POST Inserta nueva partida', action: 'Crear partida a partida', },
            { name: 'Actualizar Partida', value: 'update', description: 'PUT Modifica partida existente', action: 'Actualizar partida a partida', },
            { name: 'Eliminar Partida', value: 'delete', description: 'DELETE Elimina una partida', action: 'Eliminar partida a partida', },
        ],
        default: 'getAll',
    },
];
exports.partidaFields = [
    {
        displayName: 'ID (Producto O Partida)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: { service: ['sifac'], resource: ['partida'] },
            hide: { operation: ['getAll', 'create', 'update'] }
        },
        description: 'ID Producto (para "Listar Partidas Producto") o ID Partida (para Delete)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['partida'] } },
        description: 'Cuerpo para POST/PUT (incluir parámetros flags como "ingresoTropa": true aquí) o Filtros GET',
    },
];
//# sourceMappingURL=description.js.map