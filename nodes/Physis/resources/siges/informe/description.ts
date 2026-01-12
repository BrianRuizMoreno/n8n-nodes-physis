import { INodeProperties } from 'n8n-workflow';

export const informeOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['informe'] } },
        options: [

			{ name: 'Listar Informes', value: 'getAll', description: 'GET Lista facturas/prefacturas. Filtros en JSON.' },
            { name: 'PDF Valores', value: 'getPdfValores', description: 'GET Genera PDF de valores de un comprobante.' },
            { name: 'PDF Afectaciones', value: 'getPdfAfectaciones', description: 'GET Genera PDF de afectaciones de un comprobante.' },
            { name: 'Resumen de Cuenta', value: 'getResumenCuenta', description: 'GET Resumen de cuenta corriente. Req: idAuxi, idCtaAuxi.' },
            { name: 'Detalle Afectación', value: 'getDetalleAfectacion', description: 'GET Detalle de afectación de un comprobante (ID).' },
            { name: 'Info Comercial', value: 'getInfoComercial', description: 'GET Información comercial de cliente (Consignatario).' },
            { name: 'Composición Saldos', value: 'getComposicionSaldos', description: 'GET Composición de saldos detallada.' },
            { name: 'Composición Saldos (Reagrupados)', value: 'getComposicionSaldosReagrupados', description: 'GET Composición de saldos reagrupada.' },
        ],
        default: 'getAll',
    },
];

export const informeFields: INodeProperties[] = [
    {
        displayName: 'ID Comprobante',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['informe'], 
                operation: ['getDetalleAfectacion'] 
            } 
        },
        description: 'Identificador del comprobante para ver detalle de afectación.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{\n  "fechaDesde": "2024-01-01",\n  "fechaHasta": "2024-12-31"\n}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['informe'] 
            } 
        },
        description: 'Filtros de reporte (fechas, idAuxi, idCtaAuxi, idEjercicio, etc.).',
    },
];