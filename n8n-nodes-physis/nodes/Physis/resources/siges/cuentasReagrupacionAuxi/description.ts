import { INodeProperties } from 'n8n-workflow';

export const cuentasReagrupacionAuxiOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentasReagrupacionAuxi'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista plana de cuentas. Req filtros: { idAuxi, idReagAuxi }.', action: 'Listar cuentas a cuentas reagrupacion auxi',},
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Estructura de árbol', action: 'Ver rbol a cuentas reagrupacion auxi',},
            { name: 'Ver TreeList', value: 'getTreeList', description: 'GET Estructura TreeList', action: 'Ver tree list a cuentas reagrupacion auxi',},
            { name: 'Obtener Cuenta', value: 'get', description: 'GET Detalle de una cuenta', action: 'Obtener cuenta a cuentas reagrupacion auxi',},
            { name: 'Obtener Siguiente', value: 'getNext', description: 'GET Próximo código disponible para alta', action: 'Obtener siguiente a cuentas reagrupacion auxi',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una cuenta', action: 'Crear a cuentas reagrupacion auxi',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una cuenta', action: 'Actualizar a cuentas reagrupacion auxi',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una cuenta (Req: JSON Body completo)', action: 'Eliminar a cuentas reagrupacion auxi',},
        ],
        default: 'getAll',
    },
];

export const cuentasReagrupacionAuxiFields: INodeProperties[] = [
    {
        displayName: 'ID Cuenta (Código)',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasReagrupacionAuxi'], 
                operation: ['get', 'getNext'] 
            } 
        },
        description: 'Código de la cuenta de reagrupación (ej: "1.01")',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasReagrupacionAuxi'] 
            } 
        },
        description: 'Filtros (idAuxi, idReagAuxi) o Cuerpo para Crear/Actualizar/Borrar',
    },
];