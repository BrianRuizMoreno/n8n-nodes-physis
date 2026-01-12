import { INodeProperties } from 'n8n-workflow';

export const contratoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['contrato'] } },
        options: [

            { name: 'Listar Contratos', value: 'getAll', description: 'GET Lista contratos con filtros opcionales.' },
            { name: 'Obtener Contrato', value: 'get', description: 'GET Obtiene un contrato específico por Número y Campaña.' },
            { name: 'Crear/Actualizar Contrato', value: 'create', description: 'POST Inserta o modifica un contrato.' },
            { name: 'Listar Contratos Terceros', value: 'getContratosTerceros', description: 'GET Lista contratos de terceros.' },
            { name: 'Listar Corredores', value: 'getCorredores', description: 'GET Lista de corredores disponibles.' },
            { name: 'Listar Entregadores', value: 'getEntregadores', description: 'GET Lista de entregadores.' },
            { name: 'Listar Transportistas', value: 'getTransportistas', description: 'GET Lista de transportistas.' },
            { name: 'Listar Terceros', value: 'getTerceros', description: 'GET Lista de terceros genéricos.' },
            { name: 'Listar Monedas', value: 'getMonedas', description: 'GET Lista de monedas.' },
        ],
        default: 'getAll',
    },
];

export const contratoFields: INodeProperties[] = [

    {
        displayName: 'Cód. Campaña',
        name: 'codCampania',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['contrato'], 
                operation: ['get'] 
            } 
        },
        description: 'Código de la campaña del contrato.',
    },
    {
        displayName: 'Nro. Contrato',
        name: 'nroContrato',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['contrato'], 
                operation: ['get'] 
            } 
        },
        description: 'Número identificador del contrato.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['contrato']
            },
            hide: {
                operation: ['get'] 
            }
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros Query String.\n' +
                     'Ej. Listar: { "idCorredor": 1, "idCereal": 5, "contrato": "..." }\n' +
                     'Ej. Maestros: { "filtro": "parte del nombre" }',
    },
];