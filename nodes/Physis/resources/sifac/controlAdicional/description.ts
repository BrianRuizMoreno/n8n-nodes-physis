import { INodeProperties } from 'n8n-workflow';

export const controlAdicionalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['controlAdicional'] } },
        options: [

            { name: 'Listar Controles', value: 'getAll' },
            { name: 'Obtener Control', value: 'get' },
            { name: 'Crear Control', value: 'create' },
            { name: 'Actualizar Control', value: 'update' },
            { name: 'Eliminar Control', value: 'delete' },
            { name: 'Cond: Listar Asignados (Todos)', value: 'getConductorAll' },
            { name: 'Cond: Listar Asignados (Uno)', value: 'getConductor' },
            { name: 'Cond: Asignar Lista', value: 'assignConductor' },
            { name: 'Cond: Actualizar Lista', value: 'updateConductor' },
            { name: 'Cond: Borrar Todos', value: 'clearConductor' },
            { name: 'Cond: Borrar Uno', value: 'removeConductorControl' },
            { name: 'Medio: Listar Asignados (Todos)', value: 'getMedioAll' },
            { name: 'Medio: Listar Asignados (Uno)', value: 'getMedio' },
            { name: 'Medio: Asignar Lista', value: 'assignMedio' },
            { name: 'Medio: Actualizar Lista', value: 'updateMedio' },
            { name: 'Medio: Borrar Todos', value: 'clearMedio' },
            { name: 'Medio: Borrar Uno', value: 'removeMedioControl' },
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
        description: 'ID del Control Adicional, Conductor o Medio de Transporte según la operación.',
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