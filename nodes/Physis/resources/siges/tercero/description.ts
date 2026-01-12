import { INodeProperties } from 'n8n-workflow';

export const terceroOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['tercero'] } },
        options: [

			{ name: 'Buscar', value: 'search', description: 'GET Busca terceros por texto. Filtros: { texto: "..." }.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de tercero. Req: IdAuxi, IdCtaAuxi.' },
            { name: 'Obtener Mi Perfil', value: 'getMe', description: 'GET Datos del usuario actual.' },
            { name: 'Buscar por Nro Doc', value: 'getByNroDoc', description: 'GET Busca por documento. Filtros: { NroDoc: "..." }.' },
            { name: 'Sin Usuario Asignado', value: 'getSinUsuario', description: 'GET Terceros sin usuario asignado. Req: IdAuxi.' },
            { name: 'Domicilios: Listar', value: 'getDomicilios', description: 'GET Domicilios de un tercero.' },
            { name: 'Domicilios: Guardar', value: 'saveDomicilio', description: 'POST Guarda nuevo domicilio.' },
            { name: 'Cuentas Bancarias', value: 'getCuentasBancarias', description: 'GET Cuentas bancarias asociadas.' },
            { name: 'Cuentas Bancarias (Detalle)', value: 'getCuentasBancariasDetalle', description: 'GET Detalle de una cuenta bancaria específica.' },
            { name: 'Contactos Reagrupados', value: 'getContactosReagrupados', description: 'GET Contactos de una reagrupación.' },
            { name: 'Consulta Tabla (Terceros)', value: 'tableSearch', description: 'POST Consulta avanzada con filtros, orden y paginado.' },
            { name: 'Consulta Tabla (Cuentas)', value: 'tableSearchCuentas', description: 'POST Consulta avanzada sobre cuentas bancarias.' },
            { name: 'Filtro CCB', value: 'getFiltroCCB', description: 'GET Búsqueda específica en CCB.' },
        ],
        default: 'search',
    },
];

export const terceroFields: INodeProperties[] = [
    {
        displayName: 'ID Auxi',
        name: 'id',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tercero'], 
                operation: ['get', 'getSinUsuario', 'getDomicilios', 'saveDomicilio', 'getCuentasBancariasDetalle'] 
            } 
        },
        description: 'Identificador numérico del tercero (Plan Auxiliar).',
    },
    {
        displayName: 'ID CtaAuxi',
        name: 'idCta',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tercero'], 
                operation: ['get', 'getDomicilios', 'saveDomicilio'] 
            } 
        },
        description: 'Código de cuenta del tercero.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['tercero'] 
            } 
        },
        description: 'Filtros para búsqueda (texto, NroDoc) o Body para Guardar/Consulta Avanzada.',
    },
];