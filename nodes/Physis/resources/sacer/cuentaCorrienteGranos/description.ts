import { INodeProperties } from 'n8n-workflow';

export const cuentaCorrienteGranosOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['cuentaCorrienteGranos'] } },
        options: [
            { name: 'Listar Movimientos', value: 'getMovimientos', description: 'GET Devuelve el listado detallado de movimientos', action: 'Listar Movimientos a cuenta corriente granos',},
            { name: 'Obtener Totales', value: 'getTotales', description: 'GET Devuelve los totales acumulados de la cuenta', action: 'Obtener Totales a cuenta corriente granos',},
            { name: 'Informe De Totales', value: 'getInformeTotales', description: 'GET Devuelve un informe estructurado de totales', action: 'Informe de Totales a cuenta corriente granos',},
        ],
        default: 'getMovimientos',
    },
];

export const cuentaCorrienteGranosFields: INodeProperties[] = [
    {
        displayName: 'Filtros (JSON)',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['cuentaCorrienteGranos']
            } 
        },
        description: 'Parámetros de consulta: idAuxi, idCtaAuxi, fechaDesde, fechaHasta, codCampania, codCereal, codPlanta, nroContrato, etc',
    },
];