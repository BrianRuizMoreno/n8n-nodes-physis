import { INodeProperties } from 'n8n-workflow';

export const establecimientoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['establecimiento'] } },
        options: [
            // --- Agropecuarios ---
            { name: 'Agro: Listar Todos', value: 'getAllAgro', description: 'GET Lista establecimientos agropecuarios.' },
            { name: 'Agro: Obtener por ID', value: 'getAgro', description: 'GET Datos de un establecimiento agropecuario.' },
            { name: 'Agro: Crear', value: 'createAgro', description: 'POST Crea establecimiento agropecuario.' },
            { name: 'Agro: Actualizar', value: 'updateAgro', description: 'PUT Modifica establecimiento agropecuario.' },
            { name: 'Agro: Por Cliente', value: 'getAgroByCliente', description: 'GET Establecimientos de un cliente (Req: IdCtaAuxi).' },
            { name: 'Agro: RENSPA por Cliente', value: 'getRenspaAgroByCliente', description: 'GET Datos RENSPA de un cliente.' },
            
            // --- Faenadores ---
            { name: 'Faenador: Listar Todos', value: 'getAllFaenador', description: 'GET Lista establecimientos faenadores.' },
            { name: 'Faenador: Obtener por ID', value: 'getFaenador', description: 'GET Datos de un establecimiento faenador.' },
            { name: 'Faenador: Crear', value: 'createFaenador', description: 'POST Crea establecimiento faenador.' },
            { name: 'Faenador: Actualizar', value: 'updateFaenador', description: 'PUT Modifica establecimiento faenador.' },
            { name: 'Faenador: Por Cliente', value: 'getFaenadorByCliente', description: 'GET Establecimientos de un cliente (Req: IdCtaAuxi).' },
            { name: 'Faenador: ONCCA por Cliente', value: 'getOnccaFaenadorByCliente', description: 'GET Datos ONCCA de un cliente.' },
        ],
        default: 'getAllAgro',
    },
];

export const establecimientoFields: INodeProperties[] = [
    {
        displayName: 'ID Establecimiento',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['establecimiento'], 
                operation: ['getAgro', 'getFaenador'] 
            } 
        },
        description: 'Identificador único del establecimiento.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['establecimiento'] 

            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para búsqueda por cliente (ej: {"IdCtaAuxi": "C01"}).',
    },
];