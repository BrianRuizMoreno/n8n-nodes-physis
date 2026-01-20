import { INodeProperties } from 'n8n-workflow';

export const cuentasReagrupacionPpalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentasReagrupacionPpal'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista plana de cuentas. Filtro req: { idReagPpal }.', action: 'Listar Cuentas a cuentas reagrupacion ppal',},
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Estructura de árbol', action: 'Ver Árbol a cuentas reagrupacion ppal',},
            { name: 'Ver TreeList', value: 'getTreeList', description: 'GET Estructura TreeList', action: 'Ver TreeList a cuentas reagrupacion ppal',},
            { name: 'Obtener Cuenta', value: 'get', description: 'GET Detalle de una cuenta', action: 'Obtener Cuenta a cuentas reagrupacion ppal',},
            { name: 'Obtener Siguiente', value: 'getNext', description: 'GET Próximo código disponible' , action: 'Obtener Siguiente a cuentas reagrupacion ppal',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una cuenta', action: 'Crear a cuentas reagrupacion ppal',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una cuenta', action: 'Actualizar a cuentas reagrupacion ppal',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una cuenta (Req: JSON Body completo)', action: 'Eliminar a cuentas reagrupacion ppal',},
        ],
        default: 'getAll',
    },
];

export const cuentasReagrupacionPpalFields: INodeProperties[] = [
    {
        displayName: 'ID Cuenta (Código)',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentasReagrupacionPpal'], 
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
                resource: ['cuentasReagrupacionPpal'] 
            } 
        },
        description: 'Filtros (idReagPpal) o Cuerpo para Crear/Actualizar/Borrar',
    },
];