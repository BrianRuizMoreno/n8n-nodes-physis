"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementoFields = exports.implementoOperations = void 0;
exports.implementoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['implemento'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Lista de implementos. Opcional: formatoRespuesta.',
                action: 'Obtener implementos an implemento',
            },
            {
                name: 'Obtener Maquinarias',
                value: 'getAllMaq',
                description: 'GET Lista de maquinarias. Opcional: formatoRespuesta.',
                action: 'Obtener maquinarias an implemento',
            },
            {
                name: 'Obtener Implemento Por ID',
                value: 'get',
                description: 'GET Datos de un implemento por IdImplemento',
                action: 'Obtener implemento por id an implemento',
            },
            {
                name: 'Obtener Implemento Por Nombre',
                value: 'getByName',
                description: 'GET Buscar implemento por nombre',
                action: 'Obtener implemento por nombre an implemento',
            },
            {
                name: 'Obtener Maquinaria Por Nombre',
                value: 'getMaqByName',
                description: 'GET Buscar maquinaria por nombre',
                action: 'Obtener maquinaria por nombre an implemento',
            },
            {
                name: 'Obtener Implementos por Labor',
                value: 'getByLabor',
                description: 'GET Implementos de una labor. Opcional: SinOtraMaquinaria.',
                action: 'Obtener implementos por labor an implemento',
            },
            {
                name: 'Obtener Maquinarias por Labor',
                value: 'getMaqByLabor',
                description: 'GET Maquinarias de una labor',
                action: 'Obtener maquinarias por labor an implemento',
            },
        ],
        default: 'getAll',
    },
];
exports.implementoFields = [
    {
        displayName: 'ID / Nombre / Labor',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['implemento'],
                operation: ['get', 'getByName', 'getMaqByName', 'getByLabor', 'getMaqByLabor']
            }
        },
        description: 'Ingrese el IdImplemento, Nombre o IdLabor según corresponda a la operación',
    },
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['implemento'],
                operation: ['getAll', 'getAllMaq', 'getByLabor', 'getByName', 'getMaqByName']
            }
        },
        description: 'Parámetros opcionales. Ej: {"formatoRespuesta": "CSV"}, {"SinOtraMaquinaria": true}, {"FiltroByNombre": "..."}.',
    },
];
//# sourceMappingURL=description.js.map