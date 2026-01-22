"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maestroGeneralFields = exports.maestroGeneralOperations = void 0;
exports.maestroGeneralOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'] } },
        options: [
            { name: 'Contables: Árbol', value: 'getContablesArbol', description: 'GET Árbol de contables', action: 'Contables rbol a maestro general', },
            { name: 'Dominios: Listar', value: 'getDominios', description: 'GET Listado de dominios', action: 'Dominios listar a maestro general', },
            { name: 'Dominios: Obtener', value: 'getDominio', description: 'GET Obtener un dominio por su ID', action: 'Dominios obtener a maestro general', },
            { name: 'Dominios: Listar PLA', value: 'getDominiosPLA', description: 'GET Listado de dominios PLA', action: 'Dominios listar pla a maestro general', },
            { name: 'Cabeceras: Buscar', value: 'searchCabeceras', description: 'GET Buscar cabeceras', action: 'Cabeceras buscar a maestro general', },
        ],
        default: 'getContablesArbol',
    },
];
exports.maestroGeneralFields = [
    {
        displayName: 'ID',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'], operation: ['getDominio'] } },
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['maestroGeneral'] } },
    },
];
//# sourceMappingURL=description.js.map