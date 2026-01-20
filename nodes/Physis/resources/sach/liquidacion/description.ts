import { INodeProperties } from 'n8n-workflow';

export const liquidacionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['liquidacion'] } },
        options: [

            { name: 'Get Many', value: 'getAll', description: 'GET Lista liquidaciones configuradas', action: 'Listar todas a liquidacion',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene una liquidación específica', action: 'Obtener por ID a liquidacion',},
            { name: 'Ver Árbol', value: 'getArbol', description: 'GET Estructura jerárquica de liquidaciones', action: 'Ver rbol a liquidacion',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva liquidación', action: 'Crear a liquidacion',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una liquidación existente', action: 'Actualizar a liquidacion',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una liquidación', action: 'Eliminar a liquidacion',},
            { name: 'Obtener Comprobante', value: 'getComprobante', description: 'GET Consulta un comprobante específico', action: 'Obtener comprobante a liquidacion',},
            { name: 'Obtener Comisiones (Comprobante)', value: 'getComisionesComprobante', description: 'GET Consulta comisiones de un comprobante', action: 'Obtener comisiones comprobante a liquidacion',},
        ],
        default: 'getAll',
    },
];

export const liquidacionFields: INodeProperties[] = [

    {
        displayName: 'ID Liquidación',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['liquidacion'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador de la liquidación',
    },
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['liquidacion'], 
                operation: ['getComprobante', 'getComisionesComprobante'] 
            } 
        },
        description: 'Identificador del ejercicio contable',
    },
    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['liquidacion'], 
                operation: ['getComprobante', 'getComisionesComprobante'] 
            } 
        },
        description: 'Identificador del comprobante',
    },
    {
        displayName: 'JSON Body',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['liquidacion'],
                operation: ['create', 'update']
            } 
        },
        description: 'Cuerpo con los datos de la liquidación (Configuración, Gastos, etc.)',
    },
];