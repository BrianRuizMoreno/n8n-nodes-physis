import { INodeProperties } from 'n8n-workflow';

export const bancoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['banco'] } },
        options: [

			{ name: 'Listar Todos', value: 'getAll', description: 'GET Lista de bancos.' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol. Filtro: { "soloBancosEnUso": true }.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de un banco.' },
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo banco.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un banco.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un banco.' },
            { name: 'Cuentas Corrientes (Medios)', value: 'getCCMedios', description: 'GET Cuentas por forma de pago. Filtro: { "IdFormaDePago": 1 }.' },
            { name: 'Cuentas Corrientes (Formato)', value: 'getConFormatos', description: 'GET Filtra solo bancos con formatos de valores electronicos' },
            { name: 'Cuentas Corrientes (Electrónicos)', value: 'getCCElectronicos', description: 'GET Filtro: { "Electronica": true }.' },
            { name: 'Cuentas Caución', value: 'getCaucion', description: 'GET Cuentas principales en caución.' },
            { name: 'Bancos Exporta OP', value: 'getExportaOP', description: 'GET Bancos que exportan Órdenes de Pago.' },
            { name: 'Formatos Electrónicos', value: 'getFormatos', description: 'GET Formatos (E=Exportación, I=Importación).' },
            { name: 'Códigos Operación', value: 'getCodigosOperacion', description: 'GET Códigos de operación bancaria.' },
            { name: 'Cuentas Tercero: Consultar', value: 'getCuentaTercero', description: 'GET Cuentas de un tercero. Req: { "idPpal": 1, "IdAuxi": 1, "IdCtaAuxi": "C01" }.' },
            { name: 'Cuentas Tercero: Crear', value: 'createCuentaTercero', description: 'POST Asocia cuenta a tercero.' },
            { name: 'Cuentas Tercero: Actualizar', value: 'updateCuentaTercero', description: 'PUT Modifica cuenta de tercero.' },
            { name: 'Cuentas Tercero: Eliminar', value: 'deleteCuentaTercero', description: 'DELETE Elimina cuenta de tercero.' },
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
        description: 'Identificador del banco.',
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
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listados/Cuentas Terceros.',
    },
];