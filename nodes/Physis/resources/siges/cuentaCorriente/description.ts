import { INodeProperties } from 'n8n-workflow';

export const cuentaCorrienteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentaCorriente'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Lista todas las cuentas bancarias', action: 'Listar Todas a cuenta corriente',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol Bancos > Cuentas', action: 'Listar Árbol a cuenta corriente',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de cuenta. Req: ID Cuenta + { "IdBanco": "..." }.', action: 'Obtener por ID a cuenta corriente',},
            { name: 'Medios (Combo)', value: 'getMedios', description: 'GET Lista simple de medios para interdepósitos', action: 'Medios (Combo) a cuenta corriente',},
            { name: 'Medios (Descripción)', value: 'getMediosDesc', description: 'GET Código y descripción de medio', action: 'Medios (Descripción) a cuenta corriente',},
            { name: 'Medios Por Banco', value: 'getMediosPorBanco', description: 'GET Cuenta con medios. Req: Filtro { "IdBanco": "..." }.', action: 'Medios por Banco a cuenta corriente',},
            { name: 'Filtro Electrónico', value: 'getFiltroElectronico', description: 'GET Cuentas por defecto/electrónicas', action: 'Filtro Electrónico a cuenta corriente',},
            { name: 'Exporta OP', value: 'getExportaOP', description: 'GET Cuentas con check Exporta OP', action: 'Exporta OP a cuenta corriente',},
            { name: 'Insertar', value: 'insert', description: 'GET Inserta cuenta (JSON serializado automáticamente)', action: 'Insertar a cuenta corriente',},
            { name: 'Modificar', value: 'update', description: 'GET Modifica cuenta (JSON serializado automáticamente)', action: 'Modificar a cuenta corriente',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina cuenta. Req: Filtros {idBanco, idCuentaBancaria}.', action: 'Eliminar a cuenta corriente',},
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
        description: 'Identificador numérico de la cuenta bancaria',
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
        description: 'Objeto Cuenta para Insertar/Modificar, o Filtros para Listar/Eliminar (ej: {"IdBanco": "001"})',
    },
];