import { INodeProperties } from 'n8n-workflow';

export const reagrupacionRelacionAuxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reagrupacionRelacionAuxiliar'] } },
        options: [
            { name: 'Listar Relacionadas', value: 'getRelated', description: 'GET Cuentas auxiliares ya relacionadas.' },
            { name: 'Listar Disponibles', value: 'getAvailable', description: 'GET Cuentas auxiliares disponibles para relacionar.' },
            { name: 'Listar Disponibles (Árbol)', value: 'getAvailableTree', description: 'GET Cuentas disponibles en formato árbol.' },
            { name: 'Crear Relación', value: 'create', description: 'POST Inserta relación (vincula auxiliar a reagrupación).' },
        ],
        default: 'getRelated',
    },
];

export const reagrupacionRelacionAuxiliarFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['reagrupacionRelacionAuxiliar'] 
            } 
        },
        description: 'Filtros para listar (IdAuxi, IdReagAuxi, IdCtaReagAuxi) o Array de relaciones para Crear.',
    },
];