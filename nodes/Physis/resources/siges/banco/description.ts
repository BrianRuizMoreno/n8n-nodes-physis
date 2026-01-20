import { INodeProperties } from 'n8n-workflow';

export const bancoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['banco'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Lista de bancos', action: 'Listar Todos a banco',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol. Filtro: { "soloBancosEnUso": true }.', action: 'Listar Árbol a banco',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de un banco', action: 'Obtener por ID a banco',},
            { name: 'Crear', value: 'create', description: 'POST Crea un nuevo banco', action: 'Crear a banco',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un banco', action: 'Actualizar a banco',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un banco', action: 'Eliminar a banco',},
            { name: 'Cuentas Corrientes (Medios)', value: 'getCCMedios', description: 'GET Cuentas por forma de pago. Filtro: { "IdFormaDePago": 1 }.', action: 'Cuentas Corrientes (Medios) a banco',},
            { name: 'Cuentas Corrientes (Formato)', value: 'getConFormatos', description: 'GET Filtra solo bancos con formatos de valores electronicos', action: 'Cuentas Corrientes (Formato) a banco',},
            { name: 'Cuentas Corrientes (Electrónicos)', value: 'getCCElectronicos', description: 'GET Filtro: { "Electronica": true }', action: 'Cuentas Corrientes (Electrónicos) a banco',},
            { name: 'Cuentas Caución', value: 'getCaucion', description: 'GET Cuentas principales en caución', action: 'Cuentas Caución a banco',},
            { name: 'Bancos Exporta OP', value: 'getExportaOP', description: 'GET Bancos que exportan Órdenes de Pago', action: 'Bancos Exporta OP a banco',},
            { name: 'Formatos Electrónicos', value: 'getFormatos', description: 'GET Formatos (E=Exportación, I=Importación)', action: 'Formatos Electrónicos a banco',},
            { name: 'Códigos Operación', value: 'getCodigosOperacion', description: 'GET Códigos de operación bancaria', action: 'Códigos Operación a banco',},
            { name: 'Cuentas Tercero: Consultar', value: 'getCuentaTercero', description: 'GET Cuentas de un tercero. Req: { "idPpal": 1, "IdAuxi": 1, "IdCtaAuxi": "C01" }.', action: 'Cuentas Tercero: Consultar a banco',},
            { name: 'Cuentas Tercero: Crear', value: 'createCuentaTercero', description: 'POST Asocia cuenta a tercero', action: 'Cuentas Tercero: Crear a banco',},
            { name: 'Cuentas Tercero: Actualizar', value: 'updateCuentaTercero', description: 'PUT Modifica cuenta de tercero', action: 'Cuentas Tercero: Actualizar a banco',},
            { name: 'Cuentas Tercero: Eliminar', value: 'deleteCuentaTercero', description: 'DELETE Elimina cuenta de tercero', action: 'Cuentas Tercero: Eliminar a banco',},
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