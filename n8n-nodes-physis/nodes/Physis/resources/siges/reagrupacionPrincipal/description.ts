import { INodeProperties } from 'n8n-workflow';

export const planReagrupacionPrincipalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planReagrupacionPrincipal'] } },
        options: [
            { name: 'Obtener Plan', value: 'get', description: 'GET Datos de un plan de reagrupación principal', action: 'Obtener plan a plan reagrupacion principal',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Lista de planes en formato árbol', action: 'Listar rbol a plan reagrupacion principal',},
            { name: 'Crear Plan', value: 'create', description: 'POST Inserta un plan de reagrupación principal', action: 'Crear plan a plan reagrupacion principal',},
            { name: 'Actualizar Plan', value: 'update', description: 'PUT Modifica un plan de reagrupación principal', action: 'Actualizar plan a plan reagrupacion principal',},
            { name: 'Eliminar Plan', value: 'delete', description: 'DELETE Elimina un plan. Req: ID.', action: 'Eliminar plan a plan reagrupacion principal',},
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total de cuentas del plan', action: 'Ver tama o total a plan reagrupacion principal',},
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