"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planCuentaFields = exports.planCuentaOperations = void 0;
exports.planCuentaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planCuenta'] } },
        options: [
            { name: 'Listar Todos (Combo)', value: 'getCombo', description: 'GET Devuelve lista simple de Planes de Cuentas', action: 'Listar todos combo a plan cuenta', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve un Plan de Cuenta Principal', action: 'Obtener por ID a plan cuenta', },
            { name: 'Ver Fechas', value: 'getFechas', description: 'GET Fechas de creación/modificación. Req: ID.', action: 'Ver fechas a plan cuenta', },
            { name: 'Ver Estructura', value: 'getEstructura', description: 'GET Estructura de cuentas del plan. Req: ID.', action: 'Ver estructura a plan cuenta', },
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total del Plan de Cuentas', action: 'Ver tama o total a plan cuenta', },
            { name: 'Crear', value: 'create', description: 'POST Inserta Plan (Verificar disponibilidad en API)', action: 'Crear a plan cuenta', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica Plan (Verificar disponibilidad en API)', action: 'Actualizar a plan cuenta', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un Plan de Cuenta Principal', action: 'Eliminar a plan cuenta', },
        ],
        default: 'getCombo',
    },
];
exports.planCuentaFields = [
    {
        displayName: 'ID Plan Principal',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['planCuenta'],
                operation: ['get', 'delete', 'getFechas', 'getEstructura']
            }
        },
        description: 'Identificador numérico del Plan de Cuentas (idPpal)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['planCuenta']
            }
        },
        description: 'Cuerpo para Crear/Actualizar',
    },
];
//# sourceMappingURL=description.js.map