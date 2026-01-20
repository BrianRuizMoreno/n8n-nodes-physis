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
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Listado general de comprobantes con filtros básicos',
                action: 'Listar Todos a comprobante',
            },
            { 
                name: 'Listar Paginado', 
                value: 'getAllPaginated', 
                description: 'GET Listado optimizado para grandes volúmenes de datos',
                action: 'Listar Paginado a comprobante',
            },
            { 
                name: 'Obtener Por ID', 
                value: 'get', 
                description: 'GET Recupera un comprobante completo (Requiere idEjercicio en JSON Body)',
                action: 'Obtener por ID a comprobante',
            },
            // --- GESTIÓN ---
            { 
                name: 'Crear Comprobante', 
                value: 'create', 
                description: 'POST Crea un nuevo comprobante completo (Factura, Recibo, etc.)',
                action: 'Crear Comprobante a comprobante',
            },
            { 
                name: 'Actualizar Comprobante', 
                value: 'update', 
                description: 'PUT Modifica un comprobante existente',
                action: 'Actualizar Comprobante a comprobante',
            },
            { 
                name: 'Eliminar Comprobante', 
                value: 'delete', 
                description: 'DELETE Borra un comprobante (Requiere estructura mínima en JSON Body)',
                action: 'Eliminar Comprobante a comprobante',
            },
            // --- TESORERÍA / PAGOS ---
            { 
                name: 'Generar OP Masivas', 
                value: 'createOPMasivas', 
                description: 'POST Genera Órdenes de Pago automáticas a partir de una lista de deudas',
                action: 'Generar OP Masivas a comprobante',
            },
            { 
                name: 'Pendientes De Pago', 
                value: 'getPendientesPago', 
                description: 'GET Lista comprobantes pendientes de cancelación',
                action: 'Pendientes de Pago a comprobante',
            },
            // --- VALIDACIONES ---
            { 
                name: 'Validar Existencia Externa', 
                value: 'checkExternalExists', 
                description: 'GET Verifica si ya existe una factura externa (Duplicados)',
                action: 'Validar Existencia Externa a comprobante',
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
        description: 'Número identificador del comprobante',
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
        description: 'Si es True, fuerza el borrado ignorando advertencias no críticas',
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
        description: 'Cuerpo de la solicitud o parámetros de filtrado (ej: idEjercicio, fechas, estructura del comprobante)',
    },
];