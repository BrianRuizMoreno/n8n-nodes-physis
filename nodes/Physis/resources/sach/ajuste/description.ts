import { INodeProperties } from 'n8n-workflow';

export const ajusteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['ajuste'] } },
        options: [

            { name: 'Buscar Ajustes', value: 'search', description: 'GET Lista ajustes con múltiples filtros.' },
            { name: 'Buscar Cuentas Principales', value: 'getCuentas', description: 'GET Cuentas contables para ajustes.' },
            { name: 'Tipos Comprobante (Financiero)', value: 'getTiposFinanciero', description: 'GET Tipos de comprobante financiero.' },
            { name: 'Tipos Comprobante (Físico/Monetario)', value: 'getTiposFisicoMonetario', description: 'GET Tipos de comprobante físico o monetario.' },
            { name: 'Gastos (Financiero)', value: 'getGastosFinanciero', description: 'GET Lista gastos financieros posibles.' },
            { name: 'Gastos (Físico/Monetario)', value: 'getGastosFisicoMonetario', description: 'GET Lista gastos físicos/monetarios posibles.' },
            { name: 'Tributos (Financiero)', value: 'getTributosFinanciero', description: 'GET Lista tributos financieros.' },
            { name: 'Consultar Financiero', value: 'getFinanciero', description: 'GET Detalle de un ajuste financiero.' },
            { name: 'Consultar Físico', value: 'getFisico', description: 'GET Detalle de un ajuste físico.' },
            { name: 'Emitir Financiero', value: 'createFinanciero', description: 'POST Emite o Pre-emite un ajuste financiero.' },
            { name: 'Emitir Físico/Monetario (Pre)', value: 'emitirFisicoMonetario', description: 'GET Pre-emisión de ajuste físico/monetario.' },
            { name: 'Emitir Físico/Monetario (Final)', value: 'emitirFinalFisicoMonetario', description: 'GET Emisión final de ajuste físico/monetario.' },
            { name: 'Obtener Comprobante Temp', value: 'getComprobanteTemp', description: 'GET Obtiene datos de comprobante temporal.' },
            { name: 'Grabar Gastos Temp', value: 'saveGastosTemp', description: 'POST Graba gastos y vencimientos temporales.' },
        ],
        default: 'search',
    },
];

export const ajusteFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['ajuste']
            } 
        },
        description: 'Parámetros de consulta (idComprobante, fechas, tipo) o Cuerpo para emisión.',
    },
];