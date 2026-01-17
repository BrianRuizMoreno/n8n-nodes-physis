import { INodeProperties } from 'n8n-workflow';

export const conceptosIVAOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['conceptosIVA'] } },
        options: [
            { 
                name: 'Get Many', 
                value: 'getAll', 
                description: 'GET Devuelve la lista de alícuotas de IVA configuradas' 
																action: 'Listar Todos a conceptos i v a',
            },
            { 
                name: 'Obtener Detalle', 
                value: 'get', 
                description: 'GET Recupera los datos de un concepto de IVA específico' 
																action: 'Obtener Detalle a conceptos i v a',
            },
            { 
                name: 'Crear Concepto', 
                value: 'create', 
                description: 'POST Crea una nueva alícuota o categoría de IVA' 
																action: 'Crear Concepto a conceptos i v a',
            },
            { 
                name: 'Modificar Concepto', 
                value: 'update', 
                description: 'PUT Actualiza un concepto de IVA existente' 
																action: 'Modificar Concepto a conceptos i v a',
            },
            { 
                name: 'Eliminar Concepto', 
                value: 'delete', 
                description: 'DELETE Elimina un concepto de IVA' 
																action: 'Eliminar Concepto a conceptos i v a',
            },
        ],
        default: 'getAll',
    },
];

export const conceptosIVAFields: INodeProperties[] = [
    {
        displayName: 'ID Concepto IVA',
        name: 'idConceptoIVA',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['conceptosIVA'],
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico de la alícuota',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{\n  "nombre": "IVA 21%",\n  "alicuota": 21,\n  "tipo": "G",\n  "clase": "N"\n}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['conceptosIVA'],
                operation: ['create', 'update'] 
            } 
        },
        description: 'Objeto con la definición de la alícuota (nombre, porcentaje, tipo Gravado/Exento)',
    },
];