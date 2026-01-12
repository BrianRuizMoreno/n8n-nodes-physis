import { INodeProperties } from 'n8n-workflow';

export const ordenCompraInterfazOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['ordenCompraInterfaz'] } },
        options: [
            { name: 'Obtener Cabecera', value: 'getCabecera', description: 'GET Datos de cabecera de OC.' },
            { name: 'Obtener Detalle', value: 'getDetalle', description: 'GET Items de una OC.' },
            { name: 'Consultar Listado', value: 'getConsulta', description: 'GET Listado de OCs por fecha.' },
        ],
        default: 'getConsulta',
    },
];

export const ordenCompraInterfazFields: INodeProperties[] = [
    {
        displayName: 'Parámetros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { show: { service: ['sifac'], resource: ['ordenCompraInterfaz'] } },
        description: 'Ej: { "idCabecera": 123 } o { "fecha": "2023-01-01" }',
    },
];