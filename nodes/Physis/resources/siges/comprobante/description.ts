import { INodeProperties } from 'n8n-workflow';

export const comprobanteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['comprobante'] } },
        options: [
            // --- CONSULTAS ---
            { 
                name: 'Listar Todos', 
                value: 'getAll', 
                description: 'GET Listado general de comprobantes con filtros básicos.' 
            },
            { 
                name: 'Listar Paginado', 
                value: 'getAllPaginated', 
                description: 'GET Listado optimizado para grandes volúmenes de datos.' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Recupera un comprobante completo (Requiere idEjercicio en JSON Body).' 
            },
            // --- GESTIÓN ---
            { 
                name: 'Crear Comprobante', 
                value: 'create', 
                description: 'POST Crea un nuevo comprobante completo (Factura, Recibo, etc.).' 
            },
            { 
                name: 'Actualizar Comprobante', 
                value: 'update', 
                description: 'PUT Modifica un comprobante existente.' 
            },
            { 
                name: 'Eliminar Comprobante', 
                value: 'delete', 
                description: 'DELETE Borra un comprobante (Requiere estructura mínima en JSON Body).' 
            },
            // --- TESORERÍA / PAGOS ---
            { 
                name: 'Generar OP Masivas', 
                value: 'createOPMasivas', 
                description: 'POST Genera Órdenes de Pago automáticas a partir de una lista de deudas.' 
            },
            { 
                name: 'Pendientes de Pago', 
                value: 'getPendientesPago', 
                description: 'GET Lista comprobantes pendientes de cancelación.' 
            },
            // --- VALIDACIONES ---
            { 
                name: 'Validar Existencia Externa', 
                value: 'checkExternalExists', 
                description: 'GET Verifica si ya existe una factura externa (Duplicados).' 
            },
        ],
        default: 'getAllPaginated',
    },
];

export const comprobanteFields: INodeProperties[] = [
    {
        displayName: 'ID Comprobante',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobante'], 
                operation: ['get'] 
            } 
        },
        description: 'Número identificador del comprobante.',
    },
    {
        displayName: 'Advertencia (Force Delete)',
        name: 'advertencia',
        type: 'boolean',
        default: false,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobante'], 
                operation: ['delete'] 
            } 
        },
        description: 'Si es True, fuerza el borrado ignorando advertencias no críticas.',
    },
    {
        displayName: 'JSON Parámetros / Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobante']
            } 
        },
        description: 'Cuerpo de la solicitud o parámetros de filtrado (ej: idEjercicio, fechas, estructura del comprobante).',
    },
];