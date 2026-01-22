"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sistemasFields = exports.sistemasOperations = void 0;
exports.sistemasOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['sistemas'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Devuelve la lista de sistemas o módulos configurados en el ERP',
                action: 'Listar sistemas a sistemas',
            },
            {
                name: 'Obtener Sistema',
                value: 'get',
                description: 'GET Recupera los datos de un sistema específico por ID',
                action: 'Obtener sistema a sistemas',
            },
        ],
        default: 'getAll',
    },
];
exports.sistemasFields = [
    {
        displayName: 'ID Sistema',
        name: 'idSistemas',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['sistemas'],
                operation: ['get']
            }
        },
        description: 'Identificador numérico del módulo o sistema',
    },
];
//# sourceMappingURL=description.js.map