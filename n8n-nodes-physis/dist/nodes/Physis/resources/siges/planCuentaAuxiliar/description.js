"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planCuentaAuxiliarFields = exports.planCuentaAuxiliarOperations = void 0;
exports.planCuentaAuxiliarOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planCuentaAuxiliar'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los planes auxiliares', action: 'Listar todos a plan cuenta auxiliar', },
            { name: 'Listar Combo', value: 'getCombo', description: 'GET Lista simplificada para combos (con reagrupaciones)', action: 'Listar combo a plan cuenta auxiliar', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de un plan auxiliar', action: 'Obtener por ID a plan cuenta auxiliar', },
            { name: 'Ver Niveles', value: 'getNiveles', description: 'GET Niveles y estructura del plan', action: 'Ver niveles a plan cuenta auxiliar', },
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total definido', action: 'Ver tama o total a plan cuenta auxiliar', },
            { name: 'Por Origen', value: 'getByOrigen', description: 'GET Plan por origen y código. Req: { "Origen": 1, "Plan": "..." }.', action: 'Por origen a plan cuenta auxiliar', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo plan auxiliar', action: 'Crear a plan cuenta auxiliar', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un plan auxiliar existente', action: 'Actualizar a plan cuenta auxiliar', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un plan auxiliar por ID', action: 'Eliminar a plan cuenta auxiliar', },
        ],
        default: 'getAll',
    },
];
exports.planCuentaAuxiliarFields = [
    {
        displayName: 'ID Plan Auxiliar',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['planCuentaAuxiliar'],
                operation: ['get', 'delete', 'getNiveles', 'getTamano']
            }
        },
        description: 'Identificador numérico del Plan Auxiliar (idAuxi)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['planCuentaAuxiliar']
            }
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para "Por Origen"',
    },
];
//# sourceMappingURL=description.js.map