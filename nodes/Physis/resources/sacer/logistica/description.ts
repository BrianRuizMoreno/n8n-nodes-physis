import { INodeProperties } from 'n8n-workflow';

export const logisticaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['logistica'] } },
        options: [

			{ name: 'Conductores: Listar', value: 'getConductores', description: 'GET Lista de conductores. Filtro: {"sinTransportista": true}.', action: 'Conductores: Listar a logistica',},
            { name: 'Conductores: Listar (Grilla)', value: 'getConductoresGrid', description: 'GET Vista de grilla para conductores', action: 'Conductores: Listar (Grilla) a logistica',},
            { name: 'Conductores: Obtener', value: 'getConductor', description: 'GET Datos de un conductor por código', action: 'Conductores: Obtener a logistica',},
            { name: 'Conductores: Por Transportista', value: 'getConductoresTransportista', description: 'GET Conductores asociados a un transportista (Req: ID Auxi/CtaAuxi)', action: 'Conductores: Por Transportista a logistica',},
            { name: 'Conductores: Crear', value: 'createConductor', description: 'POST Crea un nuevo conductor', action: 'Conductores: Crear a logistica',},
            { name: 'Conductores: Actualizar', value: 'updateConductor', description: 'PUT Actualiza datos de un conductor', action: 'Conductores: Actualizar a logistica',},
            { name: 'Conductores: Eliminar', value: 'deleteConductor', description: 'DELETE Elimina un conductor por código', action: 'Conductores: Eliminar a logistica',},
            { name: 'Tarifas: Listar', value: 'getTarifas', description: 'GET Listado de tarifas con filtros', action: 'Tarifas: Listar a logistica',},
            { name: 'Tarifas: Listar (Grilla)', value: 'getTarifasGrid', description: 'GET Vista de grilla para tarifas', action: 'Tarifas: Listar (Grilla) a logistica',},
            { name: 'Tarifas: Obtener', value: 'getTarifa', description: 'GET Detalle de una tarifa por código', action: 'Tarifas: Obtener a logistica',},
            { name: 'Tarifas: Crear', value: 'createTarifa', description: 'POST Crea una nueva tarifa', action: 'Tarifas: Crear a logistica',},
            { name: 'Tarifas: Actualizar', value: 'updateTarifa', description: 'PUT Modifica una tarifa existente', action: 'Tarifas: Actualizar a logistica',},
            { name: 'Tarifas: Eliminar', value: 'deleteTarifa', description: 'DELETE Elimina una tarifa. Filtros opcionales en JSON (idAuxi).', action: 'Tarifas: Eliminar a logistica',},
            { name: 'Tarifas: Imputaciones', value: 'getImputacionesTarifa', description: 'GET Imputaciones contables de una tarifa', action: 'Tarifas: Imputaciones a logistica',},
        ],
        default: 'getConductores',
    },
];

export const logisticaFields: INodeProperties[] = [
    {
        displayName: 'ID / Código',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['logistica'], 
                operation: [
                    'getConductor', 'deleteConductor', 
                    'getConductoresTransportista',
                    'getTarifa', 'deleteTarifa', 'getImputacionesTarifa'
                ] 
            } 
        },
        description: 'Código de Conductor, Código de Tarifa, o ID Auxi de Transportista',
    },
    {
        displayName: 'ID Cta Auxi',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['logistica'], 
                operation: ['getConductoresTransportista'] 
            } 
        },
        description: 'Requerido para buscar conductores de un transportista',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['logistica'],
                operation: [
                    'getConductores', 'getConductoresGrid',
                    'createConductor', 'updateConductor',
                    'getTarifas', 'getTarifasGrid', 'getTarifa',
                    'createTarifa', 'updateTarifa', 'deleteTarifa'
                ] 
            } 
        },
        description: 'Cuerpo JSON para Crear/Actualizar, o Filtros para Listar (ej: {"sinTransportista": true} o {"CodCereal": 1})',
    },
];