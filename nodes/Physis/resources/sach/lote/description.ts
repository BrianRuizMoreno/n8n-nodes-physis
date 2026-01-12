import { INodeProperties } from 'n8n-workflow';

export const loteSachOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['lote'] } },
        options: [

			{ name: 'Listar Todos', value: 'getAll', description: 'GET Lista lotes con filtros de negocio.' },
            { name: 'Listar (Grilla)', value: 'getAllGrid', description: 'GET Lista lotes para grilla.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de un lote. Req: IdLote + IdPuestoCarga (en JSON).' },
            { name: 'Crear/Modificar', value: 'upsert', description: 'POST Agrega o modifica un lote.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina lote. Req: IdLote + IdPuestoCarga (en JSON).' },
            { name: 'Por Carga: Listar', value: 'getByCarga', description: 'GET Lotes de una carga específica.' },
            { name: 'Por Carga: Upsert Masivo', value: 'upsertByCarga', description: 'POST Agrega/Modifica lotes por comprador/vendedor.' },
            { name: 'Por Carga: Eliminar', value: 'deleteByCarga', description: 'DELETE Elimina lotes de una carga.' },
            { name: 'Util: Próximo Nro', value: 'getProximo', description: 'GET Próximo número de lote para un puesto.' },
            { name: 'Util: Puestos de Carga', value: 'getPuestos', description: 'GET Lista de puestos utilizados.' },
            { name: 'Util: Formas de Cobro', value: 'getFormasCobro', description: 'GET Formas de cobro utilizadas.' },
            { name: 'Util: Existe Boleto', value: 'getExisteBoleto', description: 'GET Verifica si existe nro boleto.' },
            { name: 'Util: Pendientes Emisión', value: 'getPendientes', description: 'GET Lotes pendientes de liquidar.' },
            { name: 'Util: Tipo Comprobante', value: 'getTipoComprobante', description: 'GET Tipo comprobante por defecto.' },
            { name: 'Util: Prefijos', value: 'getPrefijos', description: 'GET Prefijos disponibles.' },
            { name: 'Util: Gasto/Comisión', value: 'getGastoComisionTotal', description: 'GET Alicuotas de gastos y comisiones.' },
        ],
        default: 'getAll',
    },
];

export const loteSachFields: INodeProperties[] = [
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
        description: 'Dependiendo de la operación: IdLote, IdCarga o IdPuestoCarga.',
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
        description: 'Cuerpo para Upsert, o Filtros/Parámetros adicionales (ej: IdPuestoCarga para GET/DELETE).',
    },
];