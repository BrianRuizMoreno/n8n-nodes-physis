import { INodeProperties } from 'n8n-workflow';

export const grupoPermisosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['grupoPermisos'] } },
        options: [
            { 
                name: 'Productos: Listar Asignados', 
                value: 'getProductos', 
                description: 'GET Obtiene productos visibles por el grupo',
                action: 'Productos: Listar Asignados a grupo permisos',
            },
            { 
                name: 'Productos: Detalle Restricciones', 
                value: 'getProductosRestricciones', 
                description: 'GET Detalle técnico de restricciones de productos',
                action: 'Productos: Detalle Restricciones a grupo permisos',
            },
            { 
                name: 'Productos: Asignar/Actualizar', 
                value: 'updateProductos', 
                description: 'POST Asigna restricciones de productos. Body JSON con array de restricciones.',
                action: 'Productos: Asignar/Actualizar a grupo permisos',
            },
        ],
        default: 'getProductos',
    },
];

export const grupoPermisosFields: INodeProperties[] = [
    {
        displayName: 'ID Grupo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['grupoPermisos'] 
            } 
        },
        description: 'Identificador numérico del Grupo de Usuarios (idGrupo)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['grupoPermisos'] 
            } 
        },
        description: 'Cuerpo para POST (Asignaciones) o Filtros para GET',
    },
];