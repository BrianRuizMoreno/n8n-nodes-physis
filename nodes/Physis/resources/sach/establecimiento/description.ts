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
            { name: 'Agro: Listar Todos', value: 'getAllAgro', description: 'GET Lista establecimientos agropecuarios', action: 'Agro: Listar Todos an establecimiento',},
            { name: 'Agro: Obtener por ID', value: 'getAgro', description: 'GET Datos de un establecimiento agropecuario', action: 'Agro: Obtener por ID an establecimiento',},
            { name: 'Agro: Crear', value: 'createAgro', description: 'POST Crea establecimiento agropecuario', action: 'Agro: Crear an establecimiento',},
            { name: 'Agro: Actualizar', value: 'updateAgro', description: 'PUT Modifica establecimiento agropecuario', action: 'Agro: Actualizar an establecimiento',},
            { name: 'Agro: Por Cliente', value: 'getAgroByCliente', description: 'GET Establecimientos de un cliente (Req: IdCtaAuxi)', action: 'Agro: Por Cliente an establecimiento',},
            { name: 'Agro: RENSPA por Cliente', value: 'getRenspaAgroByCliente', description: 'GET Datos RENSPA de un cliente', action: 'Agro: RENSPA por Cliente an establecimiento',},
 
            // --- Faenadores ---
            { name: 'Faenador: Listar Todos', value: 'getAllFaenador', description: 'GET Lista establecimientos faenadores', action: 'Faenador: Listar Todos an establecimiento',},
            { name: 'Faenador: Obtener por ID', value: 'getFaenador', description: 'GET Datos de un establecimiento faenador', action: 'Faenador: Obtener por ID an establecimiento',},
            { name: 'Faenador: Crear', value: 'createFaenador', description: 'POST Crea establecimiento faenador', action: 'Faenador: Crear an establecimiento',},
            { name: 'Faenador: Actualizar', value: 'updateFaenador', description: 'PUT Modifica establecimiento faenador', action: 'Faenador: Actualizar an establecimiento',},
            { name: 'Faenador: Por Cliente', value: 'getFaenadorByCliente', description: 'GET Establecimientos de un cliente (Req: IdCtaAuxi)', action: 'Faenador: Por Cliente an establecimiento',},
            { name: 'Faenador: ONCCA por Cliente', value: 'getOnccaFaenadorByCliente', description: 'GET Datos ONCCA de un cliente', action: 'Faenador: ONCCA por Cliente an establecimiento',},
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
        description: 'Identificador único del establecimiento',
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
        description: 'Cuerpo para Crear/Actualizar, o Filtros para búsqueda por cliente (ej: {"IdCtaAuxi": "C01"})',
    },
];