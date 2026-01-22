"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlAdicionalFields = exports.controlAdicionalOperations = void 0;
exports.controlAdicionalOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['controlAdicional'] } },
        options: [
            { name: 'Get Many', value: 'getAll', action: 'Listar controles a control adicional', },
            { name: 'Obtener Control', value: 'get', action: 'Obtener control a control adicional', },
            { name: 'Crear Control', value: 'create', action: 'Crear control a control adicional', },
            { name: 'Actualizar Control', value: 'update', action: 'Actualizar control a control adicional', },
            { name: 'Eliminar Control', value: 'delete', action: 'Eliminar control a control adicional', },
            { name: 'Cond: Listar Asignados (Todos)', value: 'getConductorAll', action: 'Cond listar asignados todos a control adicional', },
            { name: 'Cond: Listar Asignados (Uno)', value: 'getConductor', action: 'Cond listar asignados uno a control adicional', },
            { name: 'Cond: Asignar Lista', value: 'assignConductor', action: 'Cond asignar lista a control adicional', },
            { name: 'Cond: Actualizar Lista', value: 'updateConductor', action: 'Cond actualizar lista a control adicional', },
            { name: 'Cond: Borrar Todos', value: 'clearConductor', action: 'Cond borrar todos a control adicional', },
            { name: 'Cond: Borrar Uno', value: 'removeConductorControl', action: 'Cond borrar uno a control adicional', },
            { name: 'Medio: Listar Asignados (Todos)', value: 'getMedioAll', action: 'Medio listar asignados todos a control adicional', },
            { name: 'Medio: Listar Asignados (Uno)', value: 'getMedio', action: 'Medio listar asignados uno a control adicional', },
            { name: 'Medio: Asignar Lista', value: 'assignMedio', action: 'Medio asignar lista a control adicional', },
            { name: 'Medio: Actualizar Lista', value: 'updateMedio', action: 'Medio actualizar lista a control adicional', },
            { name: 'Medio: Borrar Todos', value: 'clearMedio', action: 'Medio borrar todos a control adicional', },
            { name: 'Medio: Borrar Uno', value: 'removeMedioControl', action: 'Medio borrar uno a control adicional', },
        ],
        default: 'getAll',
    },
];
exports.controlAdicionalFields = [
    {
        displayName: 'ID Entidad / Control',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: { service: ['sifac'], resource: ['controlAdicional'] },
            hide: { operation: ['getAll', 'create', 'getConductorAll', 'getMedioAll'] }
        },
        description: 'ID del Control Adicional, Conductor o Medio de Transporte según la operación',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['controlAdicional'] } },
        description: 'Para "Borrar Uno", incluir {"idControlAdicional": "..."}. Para Create/Update incluir objeto.',
    },
];
//# sourceMappingURL=description.js.map