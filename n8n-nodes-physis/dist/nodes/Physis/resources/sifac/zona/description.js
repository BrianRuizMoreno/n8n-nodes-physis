"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zonaFields = exports.zonaOperations = void 0;
exports.zonaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['zona'] } },
        options: [
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol de zonas', action: 'Listar rbol a zona', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de una zona (idCtaReagAuxi)', action: 'Obtener por ID a zona', },
            { name: 'Crear', value: 'create', description: 'POST Crea una nueva zona', action: 'Crear a zona', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una zona existente', action: 'Actualizar a zona', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una zona por ID', action: 'Eliminar a zona', },
        ],
        default: 'getArbol',
    },
];
exports.zonaFields = [
    {
        displayName: 'ID Zona (CtaReagAuxi)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['zona'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador único de la zona',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sifac'],
                resource: ['zona']
            }
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Árbol (ej: {"imputables": true})',
    },
];
//# sourceMappingURL=description.js.map