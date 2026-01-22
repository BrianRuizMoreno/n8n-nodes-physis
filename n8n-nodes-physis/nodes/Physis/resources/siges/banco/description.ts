import { INodeProperties } from 'n8n-workflow';

export const bancoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['banco'] } },
        options: [
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un banco', action: 'Update a bank' },
            { name: 'Bancos Exporta OP', value: 'getExportaOP', description: 'GET Bancos que exportan Órdenes de Pago', action: 'Get banks that export payment orders' },
            { name: 'Códigos Operación', value: 'getCodigosOperacion', description: 'GET Códigos de operación bancaria', action: 'Get operation codes' },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo banco', action: 'Create a bank' },
            { name: 'Cuentas Caución', value: 'getCaucion', description: 'GET Cuentas principales en caución', action: 'Get guarantee accounts' },
            { name: 'Cuentas Corrientes (Electrónicos)', value: 'getCCElectronicos', description: 'GET Filtro: { "Electronica": true }', action: 'Get electronic checking accounts' },
            { name: 'Cuentas Corrientes (Formato)', value: 'getConFormatos', description: 'GET Filtra solo bancos con formatos de valores electronicos', action: 'Get checking accounts with format' },
            { name: 'Cuentas Corrientes (Medios)', value: 'getCCMedios', description: 'GET Cuentas por forma de pago. Filtro: { "IdFormaDePago": 1 }.', action: 'Get checking accounts by payment method' },
            { name: 'Cuentas Tercero: Actualizar', value: 'updateCuentaTercero', description: 'PUT Modifica cuenta de tercero', action: 'Update third party account' },
            { name: 'Cuentas Tercero: Consultar', value: 'getCuentaTercero', description: 'GET Cuentas de un tercero. Req: { "idPpal": 1, "IdAuxi": 1, "IdCtaAuxi": "C01" }.', action: 'Get third party accounts' },
            { name: 'Cuentas Tercero: Crear', value: 'createCuentaTercero', description: 'POST Asocia cuenta a tercero', action: 'Create third party account' },
            { name: 'Cuentas Tercero: Eliminar', value: 'deleteCuentaTercero', description: 'DELETE Elimina cuenta de tercero', action: 'Delete third party account' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un banco', action: 'Delete a bank' },
            { name: 'Formatos Electrónicos', value: 'getFormatos', description: 'GET Formatos (E=Exportación, I=Importación)', action: 'Get electronic formats' },
            { name: 'Get Many', value: 'getAll', description: 'GET Lista de bancos', action: 'Get many banks' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol. Filtro: { "soloBancosEnUso": true }.', action: 'List tree structure' },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de un banco', action: 'Get bank by ID' },
        ],
        default: 'getAll',
    },
];

export const bancoFields: INodeProperties[] = [
    {
        displayName: 'ID Banco',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['banco'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador del banco',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['banco'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listados/Cuentas Terceros',
    },
];