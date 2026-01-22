import { INodeProperties } from 'n8n-workflow';

export const ventaCampoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['ventaCampo'] } },
        options: [

            { name: 'Listar Campos', value: 'getCampos', description: 'GET Lista de campos', action: 'Listar campos a venta campo',},
            { name: 'Listar Tipos De Comprobantes', value: 'getTiposComprobantes', description: 'GET Lista de tipos de comprobantes', action: 'Listar tipos de comprobantes a venta campo',},
            { name: 'Listar Corredores', value: 'getCorredores', description: 'GET Lista de corredores (filtro opcional)', action: 'Listar corredores a venta campo',},
            { name: 'Listar Compradores', value: 'getCompradores', description: 'GET Lista de compradores (filtro opcional)', action: 'Listar compradores a venta campo',},
            { name: 'Obtener Empresa', value: 'getEmpresa', description: 'GET Datos de la empresa', action: 'Obtener empresa a venta campo',},
            { name: 'Listar Liquidaciones', value: 'getLiquidaciones', description: 'GET Liquidaciones filtradas por campaña, fecha, etc', action: 'Listar liquidaciones a venta campo',},
            { name: 'Listar Cartas De Porte', value: 'getCartasPorte', description: 'GET Cartas de porte filtradas por puesto y código', action: 'Listar cartas de porte a venta campo',},
            { name: 'Reporte De Ventas', value: 'getVentas', description: 'GET Resumen de ventas de campo', action: 'Reporte de ventas a venta campo',},
            { name: 'Reporte De Ventas (Detallado)', value: 'getVentasDetallado', description: 'GET Detalle de ventas de campo', action: 'Reporte de ventas detallado a venta campo',},
        ],
        default: 'getVentas',
    },
];

export const ventaCampoFields: INodeProperties[] = [
    {
        displayName: 'Filtros / Parámetros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['ventaCampo']
            },
            hide: {
                operation: ['getCampos', 'getTiposComprobantes', 'getEmpresa']
            }
        },
        description: 'Parámetros de filtrado según la operación seleccionada.\n\n' +
                     '**Corredores/Compradores**: { "filtro": "nombre" }\n' +
                     '**Liquidaciones**: { "fechaContabilidad": "...", "idCampania": 0, "tipoComprobante": "...", "numeroComprobante": "..." }\n' +
                     '**Cartas Porte**: { "nroPuestoCarga": 0, "codFlete": "..." }\n' +
                     '**Ventas**: { "fechaDesde": "YYYY-MM-DD", "fechaHasta": "YYYY-MM-DD", "codCampania": 0, "idCereal": 0, "idContrato": "...", "esMovimiento": true }',
    },
];