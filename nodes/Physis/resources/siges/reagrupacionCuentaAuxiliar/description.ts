import { INodeProperties } from 'n8n-workflow';

export const reagrupacionRelacionAuxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reagrupacionRelacionAuxiliar'] } },
        options: [
            { name: 'Listar Relacionadas', value: 'getRelated', description: 'GET Cuentas auxiliares ya relacionadas' 
																																																																action: 'Listar Relacionadas a reagrupacion relacion auxiliar',},
            { name: 'Listar Disponibles', value: 'getAvailable', description: 'GET Cuentas auxiliares disponibles para relacionar' 
																																																																	action: 'Listar Disponibles a reagrupacion relacion auxiliar',},
            { name: 'Listar Disponibles (Árbol)', value: 'getAvailableTree', description: 'GET Cuentas disponibles en formato árbol' 
																																																																													action: 'Listar Disponibles (Árbol) a reagrupacion relacion auxiliar',},
            { name: 'Crear Relación', value: 'create', description: 'POST Inserta relación (vincula auxiliar a reagrupación)' 
																																																							action: 'Crear Relación a reagrupacion relacion auxiliar',},
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
        description: 'Filtros para listar (IdAuxi, IdReagAuxi, IdCtaReagAuxi) o Array de relaciones para Crear',
    },
];