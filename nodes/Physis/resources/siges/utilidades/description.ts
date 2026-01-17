import { INodeProperties } from 'n8n-workflow';

export const utilidadesOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['utilidades'] } },
        options: [
            { 
                name: 'Listar Firmantes', 
                value: 'listSignatories', 
                description: 'GET Devuelve la lista de personas habilitadas para firmar' 
																action: 'Listar Firmantes an utilidades',
            },
            { 
                name: 'Controlar Fecha Subdiario', 
                value: 'checkSubjournalDate', 
                description: 'GET Valida si una fecha es permitida para un tipo de comprobante en un ejercicio' 
																action: 'Controlar Fecha Subdiario an utilidades',
            },
            { 
                name: 'Verificar Devolución IVA', 
                value: 'checkIvaRefundStatus', 
                description: 'GET Consulta si un comprobante de devolución de IVA ya está registrado' 
																action: 'Verificar Devolución IVA an utilidades',
            },
            { 
                name: 'Insertar Comprobante Tercero', 
                value: 'createThirdPartyVoucher', 
                description: 'POST Inserta un comprobante simplificado de tercero con sus imputaciones' 
																action: 'Insertar Comprobante Tercero an utilidades',
            },
        ],
        default: 'listSignatories',
    },
];

export const utilidadesFields: INodeProperties[] = [

    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['utilidades'],
                operation: ['checkSubjournalDate', 'checkIvaRefundStatus'] 
            } 
        },
        description: 'Año contable',
    },
    {
        displayName: 'ID Plan Principal',
        name: 'idPpal',
        type: 'number',
        default: 1,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['utilidades'],
                operation: ['checkSubjournalDate'] 
            } 
        },
    },
    {
        displayName: 'ID Tipo Comprobante',
        name: 'idTipoComprobante',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['utilidades'],
                operation: ['checkSubjournalDate'] 
            } 
        },
        description: 'Código del comprobante (ej: FAC)',
    },
    {
        displayName: 'Fecha',
        name: 'fecha',
        type: 'dateTime',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['utilidades'],
                operation: ['checkSubjournalDate'] 
            } 
        },
        description: 'Fecha a validar',
    },
    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['utilidades'],
                operation: ['checkIvaRefundStatus'] 
            } 
        },
    },
    {
        displayName: 'JSON Body (Array)',
        name: 'jsonBody',
        type: 'json',
        default: '[\n  {\n    "fechaInt": "2026-01-01T00:00:00Z",\n    "tipoDocumento": "CUIT",\n    "numDocumento": "30123456789",\n    "comprobantedeTerceroDetalle": []\n  }\n]',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['utilidades'],
                operation: ['createThirdPartyVoucher'] 
            } 
        },
        description: 'Array de objetos con la definición del comprobante y sus detalles',
    },
];