import { INodeProperties } from 'n8n-workflow';

export const creditoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['credito'] } },
        options: [

			{ name: 'Listar Créditos (Tercero)', value: 'getAll', description: 'GET Datos de crédito. Req: IdAuxi / IdCtaAuxi.' },
            { name: 'Crédito Disponible', value: 'getDisponible', description: 'GET Cálculo de disponible. Req: IdAuxi / IdCtaAuxi.' },
            { name: 'Detalle Disponible', value: 'getDisponibleDetalle', description: 'GET Detalle de composición. Req: IDs + Opcion (en JSON).' },
            { name: 'Tipos de Bienes', value: 'getTiposBienes', description: 'GET Lista tipos de bienes.' },
            { name: 'Formas Cancelación', value: 'getFormasCancelacion', description: 'GET Lista formas de cancelación.' },
            { name: 'Insertar/Actualizar', value: 'upsert', description: 'POST Guarda crédito (JSON serializado automáticamente).' },
            { name: 'Eliminar', value: 'delete', description: 'POST Elimina crédito. Req: IdAuxi / IdCtaAuxi.' },
        ],
        default: 'getAll',
    },
];

export const creditoFields: INodeProperties[] = [
    {
        displayName: 'ID Auxi (Numérico)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['credito'], 
                operation: ['getAll', 'getDisponible', 'getDisponibleDetalle', 'delete'] 
            } 
        },
        description: 'Identificador numérico del tercero (IdAuxi).',
    },
    {
        displayName: 'ID Cuenta (Código)',
        name: 'idCta',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['credito'], 
                operation: ['getAll', 'getDisponible', 'getDisponibleDetalle', 'delete'] 
            } 
        },
        description: 'Código de cuenta del tercero (IdCtaAuxi).',
    },
    {
        displayName: 'JSON Body / Opciones',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['credito'],
                operation: ['upsert', 'getDisponibleDetalle']
            } 
        },
        description: 'Objeto de Crédito para Insertar, o {"opcion": 1} para Detalle.',
    },
];