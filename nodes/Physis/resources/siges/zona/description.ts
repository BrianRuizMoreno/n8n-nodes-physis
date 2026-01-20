import { INodeProperties } from 'n8n-workflow';

export const zonaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['zona'] } },
        options: [

			{ name: 'Listar Países', value: 'getPaises', description: 'GET Devuelve la lista de países', action: 'Listar Países a zona',},
            { name: 'Obtener País', value: 'getPais', description: 'GET Devuelve un país por ID', action: 'Obtener País a zona',},
            { name: 'Listar Provincias', value: 'getProvincias', description: 'GET Devuelve provincias (Filtro IdPais recomendado)', action: 'Listar Provincias a zona',},
            { name: 'Obtener Provincia', value: 'getProvincia', description: 'GET Devuelve una provincia por ID', action: 'Obtener Provincia a zona',},
            { name: 'Listar Zonas (Combo)', value: 'getZonas', description: 'GET Devuelve estructura combinada de zonas según opción (1-4)', action: 'Listar Zonas (Combo) a zona',},
            { name: 'Buscar Lugares', value: 'getLugares', description: 'GET Busca lugares por texto', action: 'Buscar Lugares a zona',},
        ],
        default: 'getPaises',
    },
];

export const zonaFields: INodeProperties[] = [
    {
        displayName: 'ID (País / Provincia)',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['zona'], 
                operation: ['getPais', 'getProvincia'] 
            } 
        },
        description: 'Identificador numérico del país o provincia',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['zona'] 
            } 
        },
        description: 'Filtros opcionales (ej: {"IdPais": 1} para provincias, {"Opcion": 2} para zonas, {"textoBusqueda": "Rosario"})',
    },
];