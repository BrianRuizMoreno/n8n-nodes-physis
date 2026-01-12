import { INodeProperties } from 'n8n-workflow';

export const tarifaFleteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['tarifaFlete'] } },
        options: [
            { name: 'Listar Tablas', value: 'getAll', description: 'GET Lista las tablas de tarifas (Cabeceras).' },
            { name: 'Consultar por KM', value: 'getByKm', description: 'GET Obtiene la tarifa específica para una distancia y tabla.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva tabla de tarifas con sus rangos.' },
        ],
        default: 'getAll',
    },
];

export const tarifaFleteFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['tarifaFlete']
            } 
        },
        description: 'Parámetros de consulta (CodTabla, Km, CodCampania) o Cuerpo para Crear.',
    },
];