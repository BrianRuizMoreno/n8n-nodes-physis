import { INodeProperties } from 'n8n-workflow';

export const planReagrupacionAuxiOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planReagrupacionAuxi'] } },
        options: [
            // --- DEFINICIÓN ---
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Obtiene las definiciones de reagrupación (ej: Zonas, Canales) disponibles para un rubro' ,
				action: 'Listar Planes a plan reagrupacion auxi',
            },
            { 
                name: 'Obtener Definición', 
                value: 'get', 
                description: 'GET Recupera la configuración estructural de un plan de reagrupación' ,
                action: 'Obtener Definición a plan reagrupacion auxi',
            },
            { 
                name: 'Consultar Tamaño Máscara', 
                value: 'getTotalSize', 
                description: 'GET Devuelve la longitud total del código configurada para este plan' ,
                action: 'Consultar Tamaño Máscara a plan reagrupacion auxi',
            },
            // --- CONTENIDO ---
            { 
                name: 'Listar Nodos (Cuentas)', 
                value: 'getAccounts', 
                description: 'GET Devuelve las categorías o nodos creados bajo este esquema (ej: Norte, Sur)' ,
                action: 'Listar Nodos (Cuentas) a plan reagrupacion auxi',
            },
            { 
                name: 'Ver Terceros Asociados', 
                value: 'getAssociatedAuxiliaries', 
                description: 'GET Devuelve la lista de Clientes/Proveedores asignados a una categoría específica' ,
                action: 'Ver Terceros Asociados a plan reagrupacion auxi',
            },
            // --- GESTIÓN ---
            { 
                name: 'Crear Plan', 
                value: 'create', 
                description: 'POST Define una nueva estructura de clasificación' ,
                action: 'Crear Plan a plan reagrupacion auxi',
            },
            { 
                name: 'Actualizar Plan', 
                value: 'update', 
                description: 'PUT Modifica la definición de la reagrupación' ,
                action: 'Actualizar Plan a plan reagrupacion auxi',
            },
            { 
                name: 'Eliminar Plan', 
                value: 'delete', 
                description: 'DELETE Elimina una definición de reagrupación' ,
                action: 'Eliminar Plan a plan reagrupacion auxi',
            },
        ],
        default: 'getAll',
    },
];

export const planReagrupacionAuxiFields: INodeProperties[] = [
    {
        displayName: 'ID Plan Reagrupación',
        name: 'id',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxi'], 
                operation: ['get', 'delete', 'getAccounts', 'getAssociatedAuxiliaries', 'getTotalSize'] 
            } 
        },
        description: 'Identificador del tipo de clasificación (ej: 1=Zonas)',
    },
    {
        displayName: 'ID Plan Auxiliar (Rubro)',
        name: 'idAuxi',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxi'],
                operation: ['getAll', 'get', 'delete', 'getTotalSize']
            } 
        },
        description: 'El plan base al que pertenece esta agrupación (ej: 100=Clientes)',
    },
    {
        displayName: 'ID Cuenta Reagrupación',
        name: 'idCtaReagAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxi'],
                operation: ['getAssociatedAuxiliaries']
            } 
        },
        description: 'Código del nodo específico a consultar (ej: "ZN" para Zona Norte)',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planReagrupacionAuxi'],
                operation: ['create', 'update', 'getAll']
            } 
        },
        description: 'Estructura del plan o filtros adicionales',
    },
];