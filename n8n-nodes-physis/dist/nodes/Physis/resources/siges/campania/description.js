"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaniaFields = exports.campaniaOperations = void 0;
exports.campaniaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['campania'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Listado de campañas', action: 'Listar todas a campania', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de campaña', action: 'Obtener por ID a campania', },
            { name: 'Campaña Activa', value: 'getActive', description: 'GET Campaña actual del usuario o sistema', action: 'Campa a activa a campania', },
        ],
        default: 'getAll',
    },
];
exports.campaniaFields = [
    {
        displayName: 'ID Campaña',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { show: { service: ['siges'], resource: ['campania'], operation: ['get'] } },
    },
];
//# sourceMappingURL=description.js.map