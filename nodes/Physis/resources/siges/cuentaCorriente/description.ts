import { INodeProperties } from 'n8n-workflow';

export const cuentaCorrienteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentaCorriente'] } },
        options: [

			{ name: 'Listar Todas', value: 'getAll', description: 'GET Lista todas las cuentas bancarias.' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol Bancos > Cuentas.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de cuenta. Req: ID Cuenta + { "IdBanco": "..." }.' },
            { name: 'Medios (Combo)', value: 'getMedios', description: 'GET Lista simple de medios para interdepósitos.' },
            { name: 'Medios (Descripción)', value: 'getMediosDesc', description: 'GET Código y descripción de medio.' },
            { name: 'Medios por Banco', value: 'getMediosPorBanco', description: 'GET Cuenta con medios. Req: Filtro { "IdBanco": "..." }.' },
            { name: 'Filtro Electrónico', value: 'getFiltroElectronico', description: 'GET Cuentas por defecto/electrónicas.' },
            { name: 'Exporta OP', value: 'getExportaOP', description: 'GET Cuentas con check Exporta OP.' },
            { name: 'Insertar', value: 'insert', description: 'GET Inserta cuenta (JSON serializado automáticamente).' },
            { name: 'Modificar', value: 'update', description: 'GET Modifica cuenta (JSON serializado automáticamente).' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina cuenta. Req: Filtros {idBanco, idCuentaBancaria}.' },
        ],
        default: 'getAll',
    },
];

export const cuentaCorrienteFields: INodeProperties[] = [
    {
        displayName: 'ID Cuenta Bancaria',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentaCorriente'], 
                operation: ['get'] 
            } 
        },
        description: 'Identificador numérico de la cuenta bancaria.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentaCorriente'] 
            } 
        },
        description: 'Objeto Cuenta para Insertar/Modificar, o Filtros para Listar/Eliminar (ej: {"IdBanco": "001"}).',
    },
];