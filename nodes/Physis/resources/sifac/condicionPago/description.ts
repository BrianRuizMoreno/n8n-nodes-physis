import { INodeProperties } from 'n8n-workflow';

export const condicionPagoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['condicionPago'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista condiciones. Filtro opcional: { "obtenerTambienSoloLectura": true }.', action: 'Listar Todas a condicion pago',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura jerárquica de condiciones', action: 'Listar Árbol a condicion pago',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de una condición (idCtaReagAuxi)', action: 'Obtener por ID a condicion pago',},
            { name: 'Vencimientos Manuales', value: 'getVencimientosManuales', description: 'GET Vencimientos. Req ID y { "idCabecera": 1 }.', action: 'Vencimientos Manuales a condicion pago',},
            { name: 'Crear', value: 'create', description: 'POST Crea una nueva condición de pago', action: 'Crear a condicion pago',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una condición existente', action: 'Actualizar a condicion pago',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una condición por ID', action: 'Eliminar a condicion pago',},
        ],
        default: 'getAll',
    },
];

export const condicionPagoFields: INodeProperties[] = [
    {
        displayName: 'ID Condición (CtaReagAuxi)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['condicionPago'], 
                operation: ['get', 'delete', 'getVencimientosManuales'] 
            } 
        },
        description: 'Identificador único de la condición de pago',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['condicionPago'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listas (ej: {"idCabecera": 123})',
    },
];