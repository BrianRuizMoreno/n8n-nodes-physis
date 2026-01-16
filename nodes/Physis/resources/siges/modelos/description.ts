import { INodeProperties } from 'n8n-workflow';

export const modeloOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['modelo'] } },
        options: [
            { 
                name: 'Listar Modelos', 
                value: 'getAll', 
                description: 'GET Devuelve la lista de modelos o plantillas de comprobantes disponibles.' 
            },
            { 
                name: 'Obtener Modelo', 
                value: 'get', 
                description: 'GET Recupera la configuración detallada de un modelo específico.' 
            },
        ],
        default: 'getAll',
    },
];

export const modeloFields: INodeProperties[] = [

    {
        displayName: 'ID Modelo',
        name: 'idModelo',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['modelo'],
                operation: ['get'] 
            } 
        },
        description: 'Identificador numérico de la plantilla.',
    },
    {
        displayName: 'ID Plan Principal',
        name: 'idPpal',
        type: 'number',
        default: 1,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['modelo']
            } 
        },
        description: 'Contexto del plan contable (Generalmente 1).',
    },
    {
        displayName: 'Tipo Comprobante (Filtro)',
        name: 'idTipoComprobante',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['modelo'],
                operation: ['getAll'] 
            } 
        },
        description: 'Filtrar modelos asociados a un tipo de documento específico (ej: FAC, REM).',
    },
];