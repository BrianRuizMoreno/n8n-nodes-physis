"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoDocumentoFields = exports.tipoDocumentoOperations = void 0;
exports.tipoDocumentoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tipoDocumento'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista tipos de documento. Filtros en JSON.', action: 'Listar todos a tipo documento', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de un tipo de documento', action: 'Obtener por ID a tipo documento', },
            { name: 'Crear', value: 'create', description: 'POST Inserta nuevo tipo de documento', action: 'Crear a tipo documento', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica tipo de documento existente', action: 'Actualizar a tipo documento', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina tipo de documento', action: 'Eliminar a tipo documento', },
        ],
        default: 'getAll',
    },
];
exports.tipoDocumentoFields = [
    {
        displayName: 'ID Tipo Doc',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tipoDocumento'],
                operation: ['get', 'delete']
            }
        },
        description: 'Identificador del tipo de documento (ej: "80" para CUIT)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['tipoDocumento']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar (personaFisica, personaJuridica)',
    },
];
//# sourceMappingURL=description.js.map