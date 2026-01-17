import { INodeProperties } from 'n8n-workflow';

export const ajusteOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['ajuste'] } },
        options: [
            { name: 'Buscar Ajustes', value: 'search', description: 'GET Lista ajustes con múltiples filtros', action: 'Buscar Ajustes an ajuste',},
            { name: 'Buscar Cuentas Principales', value: 'getCuentas', description: 'GET Cuentas contables para ajustes', action: 'Buscar Cuentas Principales an ajuste',},
            { name: 'Tipos Comprobante (Financiero)', value: 'getTiposFinanciero', description: 'GET Tipos de comprobante financiero', action: 'Tipos Comprobante (Financiero) an ajuste',},
            { name: 'Tipos Comprobante (Físico/Monetario)', value: 'getTiposFisicoMonetario', description: 'GET Tipos de comprobante físico o monetario', action: 'Tipos Comprobante (Físico/Monetario) an ajuste',},
            { name: 'Gastos (Financiero)', value: 'getGastosFinanciero', description: 'GET Lista gastos financieros posibles', action: 'Gastos (Financiero) an ajuste',},
            { name: 'Gastos (Físico/Monetario)', value: 'getGastosFisicoMonetario', description: 'GET Lista gastos físicos/monetarios posibles', action: 'Gastos (Físico/Monetario) an ajuste',},
            { name: 'Tributos (Financiero)', value: 'getTributosFinanciero', description: 'GET Lista tributos financieros', action: 'Tributos (Financiero) an ajuste',},
            { name: 'Consultar Financiero', value: 'getFinanciero', description: 'GET Detalle de un ajuste financiero', action: 'Consultar Financiero an ajuste',},
            { name: 'Consultar Físico', value: 'getFisico', description: 'GET Detalle de un ajuste físico', action: 'Consultar Físico an ajuste',},
            { name: 'Emitir Financiero', value: 'createFinanciero', description: 'POST Emite o Pre-emite un ajuste financiero', action: 'Emitir Financiero an ajuste',},
            { name: 'Emitir Físico/Monetario (Pre)', value: 'emitirFisicoMonetario', description: 'GET Pre-emisión de ajuste físico/monetario', action: 'Emitir Físico/Monetario (Pre) an ajuste',},
            { name: 'Emitir Físico/Monetario (Final)', value: 'emitirFinalFisicoMonetario', description: 'GET Emisión final de ajuste físico/monetario', action: 'Emitir Físico/Monetario (Final) an ajuste',},
            { name: 'Obtener Comprobante Temp', value: 'getComprobanteTemp', description: 'GET Obtiene datos de comprobante temporal', action: 'Obtener Comprobante Temp an ajuste',},
            { name: 'Grabar Gastos Temp', value: 'saveGastosTemp', description: 'POST Graba gastos y vencimientos temporales', action: 'Grabar Gastos Temp an ajuste',},
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
        description: 'Parámetros de consulta (idComprobante, fechas, tipo) o Cuerpo para emisión',
    },
];