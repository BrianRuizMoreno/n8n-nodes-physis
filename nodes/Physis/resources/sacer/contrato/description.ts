import { INodeProperties } from 'n8n-workflow';

export const contratoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['contrato'] } },
        options: [

            { name: 'Listar Todos', value: 'getAll', description: 'GET Lista contratos con múltiples filtros.' },
            { name: 'Listar por Tercero', value: 'getByTercero', description: 'GET Contratos de un cliente/proveedor específico.' },
            { name: 'Consulta Tabla', value: 'tableSearch', description: 'POST Búsqueda avanzada con paginado y orden.' }, 
            { name: 'Obtener Detalle', value: 'get', description: 'GET Obtiene un contrato por Campaña y Número.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo contrato.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un contrato existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un contrato por su ID interno.' },
        ],
        default: 'getAll',
    },
];

export const contratoFields: INodeProperties[] = [

    {
        displayName: 'ID Contrato (Interno)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['contrato'], 
                operation: ['delete'] 
            } 
        },
        description: 'ID interno numérico del contrato para eliminación.',
    },

    {
        displayName: 'Cód Campaña',
        name: 'codCampania',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['contrato'], 
                operation: ['get'] 
            } 
        },
        description: 'Código de la campaña del contrato.',
    },
    {
        displayName: 'Nro Contrato',
        name: 'nroContrato',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['contrato'], 
                operation: ['get'] 
            } 
        },
        description: 'Número visible del contrato (string).',
    },

    {
        displayName: 'ID Auxiliar (idAuxi)',
        name: 'idAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['contrato'], 
                operation: ['getByTercero'] 
            } 
        },
        description: 'Tipo de auxiliar (ej: 1 para Clientes).',
    },
    {
        displayName: 'ID Cuenta Auxiliar',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['contrato'], 
                operation: ['getByTercero'] 
            } 
        },
        description: 'Código de la cuenta auxiliar.',
    },

    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['contrato']
            } 
        },
        description: 'Cuerpo para Crear/Editar o Filtros para Listados (fechaDesde, codCereal, estadoContrato, etc).',
    },
];