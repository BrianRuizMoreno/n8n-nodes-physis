import { INodeProperties } from 'n8n-workflow';

export const fijacionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['fijacion'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista fijaciones globales con filtros', action: 'Listar Todas a fijacion',},
            { name: 'Listar Por Contrato', value: 'getByContract', description: 'GET Lista fijaciones de un contrato específico', action: 'Listar por Contrato a fijacion',},
            { name: 'Obtener Detalle', value: 'get', description: 'GET Detalle de una fijación (Req: Campaña, Contrato, NroFijación)', action: 'Obtener Detalle a fijacion',},
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva fijación', action: 'Crear a fijacion',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una fijación existente', action: 'Actualizar a fijacion',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una fijación (Req: ID Interno)', action: 'Eliminar a fijacion',},
        ],
        default: 'getAll',
    },
];

export const fijacionFields: INodeProperties[] = [

    {
        displayName: 'Cód Campaña',
        name: 'codCampania',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['fijacion'], 
                operation: ['get', 'getByContract'] 
            } 
        },
        description: 'Código de la campaña',
    },
    {
        displayName: 'Nro Contrato',
        name: 'nroContrato',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['fijacion'], 
                operation: ['get', 'getByContract'] 
            } 
        },
        description: 'Número del contrato asociado',
    },
    {
        displayName: 'Nro Fijación',
        name: 'nroFijacion',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['fijacion'], 
                operation: ['get'] 
            } 
        },
        description: 'Número secuencial de la fijación',
    },
    
    {
        displayName: 'ID Fijación (Interno)',
        name: 'idFijacion',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['fijacion'], 
                operation: ['delete'] 
            } 
        },
        description: 'ID interno numérico de la fijación (necesario para eliminar)',
    },

    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['fijacion']
            } 
        },
        description: 'Cuerpo para Crear/Actualizar (kilos, precio, fecha) o Filtros para Listar',
    },
];