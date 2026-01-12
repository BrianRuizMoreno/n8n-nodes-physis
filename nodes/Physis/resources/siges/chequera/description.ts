import { INodeProperties } from 'n8n-workflow';

export const chequeraOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['chequera'] } },
        options: [
            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista chequeras. Filtros en JSON (ej: IdBanco).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de una chequera (Requiere clave compuesta).' },
            { name: 'Crear', value: 'create', description: 'POST Inserta chequera.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica chequera.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina chequera (Requiere clave compuesta).' },
            { name: 'Próximo ID', value: 'getNext', description: 'GET Próximo número disponible. Filtros en JSON.' },
            { name: 'Filtro Electrónico', value: 'getByFiltroElectronico', description: 'GET Chequeras por defecto/electrónicas.' },
        ],
        default: 'getAll',
    },
];

export const chequeraFields: INodeProperties[] = [
    {
        displayName: 'ID Chequera',
        name: 'idChequera',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['chequera'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Número identificador de la chequera.',
    },
    {
        displayName: 'ID Banco',
        name: 'idBanco',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['chequera'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del banco.',
    },
    {
        displayName: 'ID Cuenta Bancaria',
        name: 'idCuentasBancarias',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['chequera'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador de la cuenta bancaria (o idCuentaCte).',
    },

    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['chequera'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listas (ej: {"IdBanco": "001", "TodosLosBancos": true}).',
    },
];