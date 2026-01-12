import { INodeProperties } from 'n8n-workflow';

export const comprobanteSifacOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['comprobante'] } },
        options: [

			{ name: 'Listar Cabeceras', value: 'getCabeceras', description: 'GET Listado ligero. Filtros: fechaDesde, fechaHasta, subSistema.' },
            { name: 'Consulta Avanzada (Grid)', value: 'getConsultaGrid', description: 'POST Consulta compleja con paginado y filtros.' },
            { name: 'Crear Comprobante', value: 'create', description: 'POST Registra un nuevo comprobante completo.' },
            { name: 'Autorización: Consultar', value: 'getAutorizacionGrid', description: 'POST Consulta ítems para autorización.' },
            { name: 'Autorización: Actualizar', value: 'authorizeItem', description: 'PATCH Autoriza/Desautoriza un ítem específico.' },
        ],
        default: 'getCabeceras',
    },
];

export const comprobanteSifacFields: INodeProperties[] = [
    {
        displayName: 'ID Cabecera',
        name: 'idCabecera',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['comprobante'], 
                operation: ['authorizeItem'] 
            } 
        },
        description: 'Identificador de la cabecera del comprobante.',
    },
    {
        displayName: 'ID Movimiento',
        name: 'idMovimiento',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['comprobante'], 
                operation: ['authorizeItem'] 
            } 
        },
        description: 'Identificador del movimiento/ítem a autorizar.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['comprobante'] 
            } 
        },
        description: 'Para Listar: Filtros Query (fechaDesde). Para Consultas/Crear: Objeto JSON completo. Para Autorizar: { "autoriza": true }.',
    },
];