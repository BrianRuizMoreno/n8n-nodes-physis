import { INodeProperties } from 'n8n-workflow';

export const planReagrupacionAuxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planReagrupacionAuxiliar'] } },
        options: [

			{ name: 'Obtener Plan', value: 'get', description: 'GET Datos de un plan. Req: idAuxi, idReagAuxi.' },
            { name: 'Listar por Auxiliar', value: 'getByAuxi', description: 'GET Planes de reagrupación de un Plan Auxiliar (idAuxi).' },
            { name: 'Crear Plan', value: 'create', description: 'POST Inserta un plan de reagrupación.' },
            { name: 'Actualizar Plan', value: 'update', description: 'PUT Modifica un plan de reagrupación.' },
            { name: 'Eliminar Plan', value: 'delete', description: 'DELETE Elimina un plan. Req: idReagAuxi, idAuxi.' },
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Árbol de planes de reagrupación.' },
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total de cuentas. Req: idReagAuxi.' },
            { name: 'Cuentas: Listar (por Reag)', value: 'getCuentasByReag', description: 'GET Cuentas de un plan de reagrupación (idReagAuxi).' },
            { name: 'Cuentas: Listar (por Auxi+Reag)', value: 'getCuentasByAuxiReag', description: 'GET Cuentas por idAuxi e idReagAuxi.' },
            { name: 'Cuentas: Detalle', value: 'getCuentaDetalle', description: 'GET Detalle de una cuenta reagrupada (idCtaReagAuxi).' },
            { name: 'Cuentas: Auxiliares Asociadas', value: 'getAuxiliaresAsociadas', description: 'GET Cuentas auxiliares dentro de una reagrupación.' },
        ],
        default: 'getArbol',
    },
];

export const planReagrupacionAuxiliarFields: INodeProperties[] = [
    {
        displayName: 'ID Plan Auxiliar (idAuxi)',
        name: 'idAuxi',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxiliar'], 
                operation: ['get', 'getByAuxi', 'delete', 'getTamano', 'getCuentasByAuxiReag'] 
            } 
        },
        description: 'Identificador del Plan de Cuentas Auxiliar.',
    },
    {
        displayName: 'ID Plan Reagrupación (idReagAuxi)',
        name: 'idReagAuxi',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxiliar'], 
                operation: ['get', 'delete', 'getTamano', 'getCuentasByReag', 'getCuentasByAuxiReag', 'getCuentaDetalle', 'getAuxiliaresAsociadas'] 
            } 
        },
        description: 'Identificador del Plan de Reagrupación.',
    },
    {
        displayName: 'ID Cuenta Reagrupada (idCtaReagAuxi)',
        name: 'idCtaReagAuxi',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxiliar'], 
                operation: ['getCuentaDetalle', 'getAuxiliaresAsociadas'] 
            } 
        },
        description: 'Código de la cuenta reagrupada.',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxiliar'], 
                operation: ['create', 'update'] 
            } 
        },
        description: 'Objeto Plan para Crear/Actualizar.',
    },
];