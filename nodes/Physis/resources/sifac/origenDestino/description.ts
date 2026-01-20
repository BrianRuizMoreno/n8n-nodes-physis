import { INodeProperties } from 'n8n-workflow';

export const origenDestinoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['origenDestino'] } },
        options: [
            { name: 'Obtener Sugeridos', value: 'getSugeridos', description: 'GET Origen y Destino sugeridos', action: 'Obtener sugeridos an origen destino',},
        ],
        default: 'getSugeridos',
    },
];

export const origenDestinoFields: INodeProperties[] = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['origenDestino'] } },
        description: 'Ej: { "idTipoComprobante": "PED", "deposito": "01", "idAuxi": 123 }',
    },
];