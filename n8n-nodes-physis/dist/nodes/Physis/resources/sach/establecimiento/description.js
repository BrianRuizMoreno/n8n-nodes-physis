"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.establecimientoFields = exports.establecimientoOperations = void 0;
exports.establecimientoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['establecimiento'] } },
        options: [
            { name: 'Agro: Listar Todos', value: 'getAllAgro', description: 'GET Lista establecimientos agropecuarios', action: 'Agro listar todos an establecimiento', },
            { name: 'Agro: Obtener por ID', value: 'getAgro', description: 'GET Datos de un establecimiento agropecuario', action: 'Agro obtener por id an establecimiento', },
            { name: 'Agro: Crear', value: 'createAgro', description: 'POST Crea establecimiento agropecuario', action: 'Agro crear an establecimiento', },
            { name: 'Agro: Actualizar', value: 'updateAgro', description: 'PUT Modifica establecimiento agropecuario', action: 'Agro actualizar an establecimiento', },
            { name: 'Agro: Por Cliente', value: 'getAgroByCliente', description: 'GET Establecimientos de un cliente (Req: IdCtaAuxi)', action: 'Agro por cliente an establecimiento', },
            { name: 'Agro: RENSPA por Cliente', value: 'getRenspaAgroByCliente', description: 'GET Datos RENSPA de un cliente', action: 'Agro renspa por cliente an establecimiento', },
            { name: 'Faenador: Listar Todos', value: 'getAllFaenador', description: 'GET Lista establecimientos faenadores', action: 'Faenador listar todos an establecimiento', },
            { name: 'Faenador: Obtener por ID', value: 'getFaenador', description: 'GET Datos de un establecimiento faenador', action: 'Faenador obtener por id an establecimiento', },
            { name: 'Faenador: Crear', value: 'createFaenador', description: 'POST Crea establecimiento faenador', action: 'Faenador crear an establecimiento', },
            { name: 'Faenador: Actualizar', value: 'updateFaenador', description: 'PUT Modifica establecimiento faenador', action: 'Faenador actualizar an establecimiento', },
            { name: 'Faenador: Por Cliente', value: 'getFaenadorByCliente', description: 'GET Establecimientos de un cliente (Req: IdCtaAuxi)', action: 'Faenador por cliente an establecimiento', },
            { name: 'Faenador: ONCCA por Cliente', value: 'getOnccaFaenadorByCliente', description: 'GET Datos ONCCA de un cliente', action: 'Faenador oncca por cliente an establecimiento', },
        ],
        default: 'getAllAgro',
    },
];
exports.establecimientoFields = [
    {
        displayName: 'ID Establecimiento',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['establecimiento'],
                operation: ['getAgro', 'getFaenador']
            }
        },
        description: 'Identificador único del establecimiento',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['establecimiento']
            }
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para búsqueda por cliente (ej: {"IdCtaAuxi": "C01"})',
    },
];
//# sourceMappingURL=description.js.map