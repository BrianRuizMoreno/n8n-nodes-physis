"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoContratoFields = exports.tipoContratoOperations = void 0;
exports.tipoContratoOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['tipoContrato'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista tipos de contrato (filtro opcional)', action: 'Listar todos a tipo contrato', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un tipo de contrato específico', action: 'Obtener por ID a tipo contrato', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de contrato', action: 'Crear a tipo contrato', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de contrato existente', action: 'Actualizar a tipo contrato', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de contrato', action: 'Eliminar a tipo contrato', },
        ],
        default: 'getAll',
    },
];
exports.tipoContratoFields = [
    {
        displayName: 'ID Tipo Contrato',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['tipoContrato'],
                operation: ['get', 'delete']
            }
        },
        description: 'Código numérico del tipo de contrato (codTipoContrato)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['savec'],
                resource: ['tipoContrato']
            },
            hide: {
                operation: ['get', 'delete']
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar.\n' +
            'Ej. Listar: { "filtroFijaciones": 1 } (0=Todos, 1=Con Fijación, 2=Sin Fijación).\n' +
            'Ej. Crear: { "descripcion": "Canje", "fijaciones": true ... }',
    },
];
//# sourceMappingURL=description.js.map