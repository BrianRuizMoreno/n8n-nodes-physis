import { INodeProperties } from 'n8n-workflow';

export const comprobanteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['comprobante'] } },
        options: [

			{ name: 'Listar', value: 'getAll', description: 'GET Lista comprobantes. Filtros: {idEjercicio, fechas}.' },
            { name: 'Listar (Paginado)', value: 'getAllPaginado', description: 'GET Lista completa paginada.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle completo con pases y retenciones.' },
            { name: 'Obtener Cantidades', value: 'getCantidades', description: 'GET Resumen de cantidades por tipo.' },
            { name: 'Obtener Parámetros', value: 'getParametros', description: 'GET Parámetros de un comprobante.' },
            { name: 'Obtener Certificados', value: 'getCertificados', description: 'GET Certificados asociados.' },
            { name: 'Pendientes a Pagar', value: 'getPendientesPago', description: 'GET Comprobantes pendientes de pago.' },
            { name: 'Calcular Retenciones', value: 'calcRetenciones', description: 'GET Simula retenciones para una OP.' },
            { name: 'Insertar', value: 'insert', description: 'GET/POST Inserta comprobante (JSON en query param).' },
            { name: 'Actualizar', value: 'update', description: 'GET/PUT Modifica comprobante (JSON en query param).' },
            { name: 'Anular', value: 'anular', description: 'GET Anula comprobante por ID.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Borra comprobante.' },
            { name: 'OP Masiva', value: 'createOPMasivo', description: 'POST Genera órdenes de pago masivas.' },
        ],
        default: 'getAll',
    },
];

export const comprobanteFields: INodeProperties[] = [
    {
        displayName: 'ID Comprobante',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobante'], 
                operation: ['get', 'getParametros', 'getCertificados'] 
            } 
        },
        description: 'Identificador del comprobante.',
    },
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobante'], 
                operation: ['get', 'getParametros', 'getCertificados'] 
            } 
        },
        description: 'Ejercicio contable del comprobante.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['comprobante'] 
            } 
        },
        description: 'Objeto Comprobante (para Insert/Update/Calc) o Filtros (para Listar/Pendientes).',
    },
];