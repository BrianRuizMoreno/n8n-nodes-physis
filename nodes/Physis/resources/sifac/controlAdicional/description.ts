import { INodeProperties } from 'n8n-workflow';

export const controlAdicionalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['controlAdicional'] } },
        options: [

            { name: 'Get Many', value: 'getAll', action: 'Listar Controles a control adicional',},
            { name: 'Obtener Control', value: 'get', action: 'Obtener Control a control adicional',},
            { name: 'Crear Control', value: 'create', action: 'Crear Control a control adicional',},
            { name: 'Actualizar Control', value: 'update', action: 'Actualizar Control a control adicional',},
            { name: 'Eliminar Control', value: 'delete', action: 'Eliminar Control a control adicional',},
            { name: 'Cond: Listar Asignados (Todos)', value: 'getConductorAll', action: 'Cond: Listar Asignados (Todos) a control adicional',},
            { name: 'Cond: Listar Asignados (Uno)', value: 'getConductor', action: 'Cond: Listar Asignados (Uno) a control adicional',},
            { name: 'Cond: Asignar Lista', value: 'assignConductor', action: 'Cond: Asignar Lista a control adicional',},
            { name: 'Cond: Actualizar Lista', value: 'updateConductor', action: 'Cond: Actualizar Lista a control adicional',},
            { name: 'Cond: Borrar Todos', value: 'clearConductor', action: 'Cond: Borrar Todos a control adicional',},
            { name: 'Cond: Borrar Uno', value: 'removeConductorControl', action: 'Cond: Borrar Uno a control adicional',},
            { name: 'Medio: Listar Asignados (Todos)', value: 'getMedioAll', action: 'Medio: Listar Asignados (Todos) a control adicional',},
            { name: 'Medio: Listar Asignados (Uno)', value: 'getMedio', action: 'Medio: Listar Asignados (Uno) a control adicional',},
            { name: 'Medio: Asignar Lista', value: 'assignMedio', action: 'Medio: Asignar Lista a control adicional',},
            { name: 'Medio: Actualizar Lista', value: 'updateMedio', action: 'Medio: Actualizar Lista a control adicional',},
            { name: 'Medio: Borrar Todos', value: 'clearMedio', action: 'Medio: Borrar Todos a control adicional',},
            { name: 'Medio: Borrar Uno', value: 'removeMedioControl', action: 'Medio: Borrar Uno a control adicional',},
        ],
        default: 'getAll',
    },
];

export const controlAdicionalFields: INodeProperties[] = [
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