import { INodeProperties } from 'n8n-workflow';

export const planReagrupacionPrincipalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planReagrupacionPrincipal'] } },
        options: [
            { name: 'Obtener Plan', value: 'get', description: 'GET Datos de un plan de reagrupación principal' 
																																																		action: 'Obtener Plan a plan reagrupacion principal',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Lista de planes en formato árbol' 
																																																							action: 'Listar Árbol a plan reagrupacion principal',},
            { name: 'Crear Plan', value: 'create', description: 'POST Inserta un plan de reagrupación principal' 
																																																			action: 'Crear Plan a plan reagrupacion principal',},
            { name: 'Actualizar Plan', value: 'update', description: 'PUT Modifica un plan de reagrupación principal' 
																																																								action: 'Actualizar Plan a plan reagrupacion principal',},
            { name: 'Eliminar Plan', value: 'delete', description: 'DELETE Elimina un plan. Req: ID.' 
																																																						action: 'Eliminar Plan a plan reagrupacion principal',},
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total de cuentas del plan' 
																																																												action: 'Ver Tamaño Total a plan reagrupacion principal',},
        ],
        default: 'getArbol',
    },
];

export const planReagrupacionPrincipalFields: INodeProperties[] = [
    {
        displayName: 'ID Plan Reagrupación',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionPrincipal'], 
                operation: ['get', 'delete', 'getTamano'] 
            } 
        },
        description: 'Identificador del Plan de Reagrupación Principal (idReagPpal)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionPrincipal'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar (ej: nivelesPlanReagPpal) o Filtros (idPpal)',
    },
];