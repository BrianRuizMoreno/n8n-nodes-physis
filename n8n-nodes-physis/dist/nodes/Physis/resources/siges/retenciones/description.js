"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retencionesFields = exports.retencionesOperations = void 0;
exports.retencionesOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['retenciones'] } },
        options: [
            {
                name: 'Listar Regímenes De Retención',
                value: 'getRegimes',
                description: 'GET Obtiene los regímenes fiscales configurados, opcionalmente filtrados por cuenta contable',
                action: 'Listar reg menes de retenci n a retenciones',
            },
            {
                name: 'Verificar Estado Certificado',
                value: 'checkCertificateStatus',
                description: 'GET Consulta si el certificado de retención de un comprobante está emitido o anulado',
                action: 'Verificar estado certificado a retenciones',
            },
        ],
        default: 'getRegimes',
    },
];
exports.retencionesFields = [
    {
        displayName: 'ID Plan Principal',
        name: 'idPpal',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['retenciones'],
                operation: ['getRegimes']
            }
        },
        description: 'Contexto del plan de cuentas (Generalmente 1)',
    },
    {
        displayName: 'Cuenta Contable (Opcional)',
        name: 'idCtaPpal',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['retenciones'],
                operation: ['getRegimes']
            }
        },
        description: 'Filtrar regímenes asociados a una cuenta contable específica (ej: "2.1.05")',
    },
    {
        displayName: 'ID Ejercicio',
        name: 'idEjercicio',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['retenciones'],
                operation: ['checkCertificateStatus']
            }
        },
        description: 'Año contable del comprobante',
    },
    {
        displayName: 'ID Comprobante',
        name: 'idComprobante',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                service: ['siges'],
                resource: ['retenciones'],
                operation: ['checkCertificateStatus']
            }
        },
        description: 'Identificador del comprobante (Orden de Pago) que generó la retención',
    },
];
//# sourceMappingURL=description.js.map