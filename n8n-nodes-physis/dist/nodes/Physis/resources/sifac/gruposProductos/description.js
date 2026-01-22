"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grupoPermisosFields = exports.grupoPermisosOperations = void 0;
exports.grupoPermisosOperations = [
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
                action: 'Productos listar asignados a grupo permisos',
            },
            {
                name: 'Productos: Detalle Restricciones',
                value: 'getProductosRestricciones',
                description: 'GET Detalle técnico de restricciones de productos',
                action: 'Productos detalle restricciones a grupo permisos',
            },
            {
                name: 'Productos: Asignar/Actualizar',
                value: 'updateProductos',
                description: 'POST Asigna restricciones de productos. Body JSON con array de restricciones.',
                action: 'Productos asignar actualizar a grupo permisos',
            },
        ],
        default: 'getProductos',
    },
];
exports.grupoPermisosFields = [
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
//# sourceMappingURL=description.js.map