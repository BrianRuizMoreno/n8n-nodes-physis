import { INodeProperties } from 'n8n-workflow';

export const retencionEspecialOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['retencionEspecial'] } },
        options: [

            { name: 'Listar Todas', value: 'getAll', description: 'GET Lista retenciones especiales (filtros opcionales).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Obtiene una retención específica.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta nueva retención especial.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una retención existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina retención (por ID o por Clave Compuesta).' },
            { name: 'Consulta Avanzada (Retenciones)', value: 'search', description: 'POST Búsqueda avanzada de retenciones.' },
            { name: 'Consulta Avanzada (Gastos)', value: 'searchGastos', description: 'POST Búsqueda avanzada de gastos asociados.' },
            { name: 'Listar por Cliente', value: 'getByCliente', description: 'GET Retenciones aplicables a un cliente.' },
            { name: 'Listar por Gasto', value: 'getByGasto', description: 'GET Retenciones filtradas por tipo de gasto.' },
            { name: 'Listar por Gasto y Cliente', value: 'getByGastoCliente', description: 'GET Retenciones filtradas por gasto y rango de clientes.' },
        ],
        default: 'getAll',
    },
];

export const retencionEspecialFields: INodeProperties[] = [
    {
        displayName: 'ID Retención',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['retencionEspecial'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador numérico de la retención.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sach'], 
                resource: ['retencionEspecial']
            } 
        },
        description: 'Cuerpo para Create/Update/Search o Filtros Query String (IdGasto, IdCtaAuxi, modo delete, etc.).',
    },
];