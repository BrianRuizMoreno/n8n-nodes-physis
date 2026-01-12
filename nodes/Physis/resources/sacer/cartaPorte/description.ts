import { INodeProperties } from 'n8n-workflow';

export const cartaPorteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['cartaPorte'] } },
        options: [
            { 
                name: 'Listar', 
                value: 'getAll', 
                description: 'GET Busca por fechas, contratos, cereal, productor, etc.' 
            },
            { 
                name: 'Listar (Vista Grilla)', 
                value: 'getGrid', 
                description: 'GET Endpoint V2. Permite ver anulados y usar filtros de grilla.' 
            },
            { 
                name: 'Obtener por ID', 
                value: 'get', 
                description: 'GET Detalle de una Carta de Porte.' 
            },
            { 
                name: 'Crear', 
                value: 'create', 
                description: 'POST Crea una nueva Carta de Porte.' 
            },
            { 
                name: 'Obtener PDF', 
                value: 'getPdf', 
                description: 'GET Devuelve el link de descarga del PDF.' 
            },
        ],
        default: 'getAll',
    },
];

export const cartaPorteFields: INodeProperties[] = [
    {
        displayName: 'ID Carta Porte',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['cartaPorte'], 
                operation: ['get', 'getPdf'] 
            } 
        },
        description: 'Identificador único de la carta de porte.',
    },
    {
        displayName: 'Incluir Anulados',
        name: 'esAnulado',
        type: 'boolean',
        default: false,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['cartaPorte'], 
                operation: ['getGrid'] 
            } 
        },
        description: 'Si se activa, incluye registros anulados (Endpoint V2).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['cartaPorte'],
                operation: ['getAll', 'getGrid', 'get', 'create']
            } 
        },
        description: 'Para "Listar": {"fechaDesde": "2023-01-01", "Cereal": 1}. Para "Crear": Objeto Carta Porte completo.',
    },
];