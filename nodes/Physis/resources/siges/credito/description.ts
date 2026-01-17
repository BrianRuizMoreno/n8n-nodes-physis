import { INodeProperties } from 'n8n-workflow';

export const creditoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['credito'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Datos de crédito. Req: IdAuxi / IdCtaAuxi.' 
																																																									action: 'Listar Créditos (Tercero) a credito',},
            { name: 'Crédito Disponible', value: 'getDisponible', description: 'GET Cálculo de disponible. Req: IdAuxi / IdCtaAuxi.' 
																																																																		action: 'Crédito Disponible a credito',},
            { name: 'Detalle Disponible', value: 'getDisponibleDetalle', description: 'GET Detalle de composición. Req: IDs + Opcion (en JSON).' 
																																																																									action: 'Detalle Disponible a credito',},
            { name: 'Tipos De Bienes', value: 'getTiposBienes', description: 'GET Lista tipos de bienes' 
																																																																action: 'Tipos de Bienes a credito',},
            { name: 'Formas Cancelación', value: 'getFormasCancelacion', description: 'GET Lista formas de cancelación' 
																																																																									action: 'Formas Cancelación a credito',},
            { name: 'Create or Update', value: 'upsert', description: 'POST Guarda crédito (JSON serializado automáticamente)' 
																																																												action: 'Insertar/Actualizar a credito',},
            { name: 'Eliminar', value: 'delete', description: 'POST Elimina crédito. Req: IdAuxi / IdCtaAuxi.' 
																																																	action: 'Eliminar a credito',},
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
        description: 'Identificador numérico del tercero (IdAuxi)',
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
        description: 'Código de cuenta del tercero (IdCtaAuxi)',
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
        description: 'Objeto de Crédito para Insertar, o {"opcion": 1} para Detalle',
    },
];