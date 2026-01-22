"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuentasAuxiFields = exports.cuentasAuxiOperations = void 0;
exports.cuentasAuxiOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentasAuxi'] } },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'GET Devuelve el listado completo de cuentas auxiliares',
                action: 'Listar todas a cuentas auxi',
            },
            {
                name: 'Obtener Por Código',
                value: 'get',
                description: 'GET Recupera el detalle de una cuenta auxiliar por su código alfanumérico (idCtaAuxi)',
                action: 'Obtener por c digo a cuentas auxi',
            },
            {
                name: 'Listar Por Plan (Rubro)',
                value: 'getByPlan',
                description: 'GET Obtiene las cuentas pertenecientes a un Plan Auxiliar específico (ej: Clientes)',
                action: 'Listar por plan rubro a cuentas auxi',
            },
            {
                name: 'Obtener Siguiente Código',
                value: 'getNextId',
                description: 'GET Sugiere el próximo código disponible para crear una cuenta nueva',
                action: 'Obtener siguiente c digo a cuentas auxi',
            },
            {
                name: 'Vista Árbol (Tree)',
                value: 'getTree',
                description: 'GET Estructura jerárquica para selectores',
                action: 'Vista rbol tree a cuentas auxi',
            },
            {
                name: 'Crear Cuenta Auxiliar',
                value: 'create',
                description: 'POST Alta de una nueva cuenta auxiliar (Requiere estructura completa en JSON)',
                action: 'Crear cuenta auxiliar a cuentas auxi',
            },
            {
                name: 'Actualizar Cuenta',
                value: 'update',
                description: 'PUT Modifica una cuenta existente',
                action: 'Actualizar cuenta a cuentas auxi',
            },
            {
                name: 'Eliminar Cuenta',
                value: 'delete',
                description: 'DELETE Borra una cuenta auxiliar (Requiere parámetros de identificación)',
                action: 'Eliminar cuenta a cuentas auxi',
            },
        ],
        default: 'getAll',
    },
];
exports.cuentasAuxiFields = [
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['cuentasAuxi'],
                operation: ['get']
            }
        },
        description: 'Código de la cuenta auxiliar (ej: "CLI-001")',
    },
    {
        displayName: 'ID Plan Auxiliar',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['cuentasAuxi'],
                operation: ['getByPlan']
            }
        },
        description: 'Identificador numérico del Plan Auxiliar (Rubro)',
    },
    {
        displayName: 'Convenio Multilateral',
        name: 'convenioMultilateral',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['cuentasAuxi'],
                operation: ['create']
            }
        },
        description: 'Marca la cuenta para tratamiento fiscal de Convenio Multilateral',
    },
    {
        displayName: 'JSON Parámetros / Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['cuentasAuxi']
            }
        },
        description: 'Cuerpo de la solicitud (para ABM) o filtros adicionales (para Consultas)',
    },
];
//# sourceMappingURL=description.js.map