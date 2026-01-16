import { INodeProperties } from 'n8n-workflow';

export const cuentasAuxiOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentasAuxi'] } },
        options: [
            // --- CONSULTAS ---
            { 
                name: 'Listar Todas', 
                value: 'getAll', 
                description: 'GET Devuelve el listado completo de cuentas auxiliares.' 
            },
            { 
                name: 'Obtener por Código', 
                value: 'get', 
                description: 'GET Recupera el detalle de una cuenta auxiliar por su código alfanumérico (idCtaAuxi).' 
            },
            { 
                name: 'Listar por Plan (Rubro)', 
                value: 'getByPlan', 
                description: 'GET Obtiene las cuentas pertenecientes a un Plan Auxiliar específico (ej: Clientes).' 
            },
            { 
                name: 'Obtener Siguiente Código', 
                value: 'getNextId', 
                description: 'GET Sugiere el próximo código disponible para crear una cuenta nueva.' 
            },
            { 
                name: 'Vista Árbol (Tree)', 
                value: 'getTree', 
                description: 'GET Estructura jerárquica para selectores.' 
            },
            // --- GESTIÓN ---
            { 
                name: 'Crear Cuenta Auxiliar', 
                value: 'create', 
                description: 'POST Alta de una nueva cuenta auxiliar (Requiere estructura completa en JSON).' 
            },
            { 
                name: 'Actualizar Cuenta', 
                value: 'update', 
                description: 'PUT Modifica una cuenta existente.' 
            },
            { 
                name: 'Eliminar Cuenta', 
                value: 'delete', 
                description: 'DELETE Borra una cuenta auxiliar (Requiere parámetros de identificación).' 
            },
        ],
        default: 'getAll',
    },
];

export const cuentasAuxiFields: INodeProperties[] = [
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
        description: 'Código de la cuenta auxiliar (ej: "CLI-001").',
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
        description: 'Identificador numérico del Plan Auxiliar (Rubro).',
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
        description: 'Marca la cuenta para tratamiento fiscal de Convenio Multilateral.',
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
        description: 'Cuerpo de la solicitud (para ABM) o filtros adicionales (para Consultas).',
    },
];