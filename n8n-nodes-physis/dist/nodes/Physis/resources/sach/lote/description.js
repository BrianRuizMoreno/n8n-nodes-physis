"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loteSachFields = exports.loteSachOperations = void 0;
exports.loteSachOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['lote'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista lotes con filtros de negocio', action: 'Listar todos a lote', },
            { name: 'Listar (Grilla)', value: 'getAllGrid', description: 'GET Lista lotes para grilla', action: 'Listar grilla a lote', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Datos de un lote. Req: IdLote + IdPuestoCarga (en JSON).', action: 'Obtener por ID a lote', },
            { name: 'Create or Update', value: 'upsert', description: 'Create a new record, or update the current one if it already exists (upsert)', action: 'Crear modificar a lote', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina lote. Req: IdLote + IdPuestoCarga (en JSON).', action: 'Eliminar a lote', },
            { name: 'Por Carga: Listar', value: 'getByCarga', description: 'GET Lotes de una carga específica', action: 'Por carga listar a lote', },
            { name: 'Por Carga: Upsert Masivo', value: 'upsertByCarga', description: 'POST Agrega/Modifica lotes por comprador/vendedor', action: 'Por carga upsert masivo a lote', },
            { name: 'Por Carga: Eliminar', value: 'deleteByCarga', description: 'DELETE Elimina lotes de una carga', action: 'Por carga eliminar a lote', },
            { name: 'Util: Próximo Nro', value: 'getProximo', description: 'GET Próximo número de lote para un puesto', action: 'Util pr ximo nro a lote', },
            { name: 'Util: Puestos de Carga', value: 'getPuestos', description: 'GET Lista de puestos utilizados', action: 'Util puestos de carga a lote', },
            { name: 'Util: Formas de Cobro', value: 'getFormasCobro', description: 'GET Formas de cobro utilizadas', action: 'Util formas de cobro a lote', },
            { name: 'Util: Existe Boleto', value: 'getExisteBoleto', description: 'GET Verifica si existe nro boleto', action: 'Util existe boleto a lote', },
            { name: 'Util: Pendientes Emisión', value: 'getPendientes', description: 'GET Lotes pendientes de liquidar', action: 'Util pendientes emisi n a lote', },
            { name: 'Util: Tipo Comprobante', value: 'getTipoComprobante', description: 'GET Tipo comprobante por defecto', action: 'Util tipo comprobante a lote', },
            { name: 'Util: Prefijos', value: 'getPrefijos', description: 'GET Prefijos disponibles', action: 'Util prefijos a lote', },
            { name: 'Util: Gasto/Comisión', value: 'getGastoComisionTotal', description: 'GET Alicuotas de gastos y comisiones', action: 'Util gasto comisi n a lote', },
        ],
        default: 'getAll',
    },
];
exports.loteSachFields = [
    {
        displayName: 'ID (Lote / Carga / Puesto)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['lote'],
                operation: ['get', 'getProximo', 'getByCarga']
            }
        },
        description: 'Dependiendo de la operación: IdLote, IdCarga o IdPuestoCarga',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['lote']
            }
        },
        description: 'Cuerpo para Upsert, o Filtros/Parámetros adicionales (ej: IdPuestoCarga para GET/DELETE)',
    },
];
//# sourceMappingURL=description.js.map