"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposFields = exports.tiposOperations = void 0;
exports.tiposOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['silab'], resource: ['tipos'] } },
        options: [
            {
                name: 'Tipos Orden: Listar Todos',
                value: 'getAllTipos',
                description: 'GET Listado de tipos de órdenes de trabajo',
                action: 'Tipos orden listar todos a tipos',
            },
            {
                name: 'Tipos Orden: Obtener Por Sigla',
                value: 'getTipo',
                description: 'GET Detalle de un tipo de orden específico',
                action: 'Tipos orden obtener por sigla a tipos',
            },
            {
                name: 'Tipos Orden: Crear',
                value: 'createTipo',
                description: 'POST Alta de nuevo tipo de orden. Requiere JSON Body.',
                action: 'Tipos orden crear a tipos',
            },
            {
                name: 'Tipos Orden: Modificar',
                value: 'updateTipo',
                description: 'PUT Modificación de tipo de orden. Requiere JSON Body.',
                action: 'Tipos orden modificar a tipos',
            },
            {
                name: 'Tipos Orden: Eliminar',
                value: 'deleteTipo',
                description: 'DELETE Elimina un tipo de orden por su Sigla',
                action: 'Tipos orden eliminar a tipos',
            },
            {
                name: 'Tipos Formulario: Listar Todos',
                value: 'getAllTiposFormulario',
                description: 'GET Listado de tipos de formulario (Configuración contable)',
                action: 'Tipos formulario listar todos a tipos',
            },
            {
                name: 'Tipos Formulario: Obtener Por ID',
                value: 'getTipoFormulario',
                description: 'GET Detalle de un tipo de formulario',
                action: 'Tipos formulario obtener por id a tipos',
            },
            {
                name: 'Tipos Formulario: Modificar',
                value: 'updateTipoFormulario',
                description: 'PUT Modificación de configuración de formulario. Requiere JSON Body.',
                action: 'Tipos formulario modificar a tipos',
            },
        ],
        default: 'getAllTipos',
    },
];
exports.tiposFields = [
    {
        displayName: 'ID / Sigla',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['tipos'],
                operation: [
                    'getTipo',
                    'deleteTipo',
                    'getTipoFormulario'
                ]
            }
        },
        description: 'Sigla para Tipos de Orden (ej: "SJO") o ID Numérico para Tipos de Formulario',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['silab'],
                resource: ['tipos'],
                operation: ['createTipo', 'updateTipo', 'updateTipoFormulario']
            }
        },
        description: 'Cuerpo de la petición con la configuración del tipo',
    },
];
//# sourceMappingURL=description.js.map