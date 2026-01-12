import { INodeProperties } from 'n8n-workflow';

export const planCuentaAuxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['planCuentaAuxiliar'] } },
        options: [

			{ name: 'Listar Todos', value: 'getAll', description: 'GET Lista todos los planes auxiliares.' },
            { name: 'Listar Combo', value: 'getCombo', description: 'GET Lista simplificada para combos (con reagrupaciones).' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de un plan auxiliar.' },
            { name: 'Ver Niveles', value: 'getNiveles', description: 'GET Niveles y estructura del plan.' },
            { name: 'Ver Tamaño Total', value: 'getTamano', description: 'GET Tamaño total definido.' },
            { name: 'Por Origen', value: 'getByOrigen', description: 'GET Plan por origen y código. Req: { "Origen": 1, "Plan": "..." }.' },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo plan auxiliar.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un plan auxiliar existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un plan auxiliar por ID.' },
        ],
        default: 'getAll',
    },
];

export const planCuentaAuxiliarFields: INodeProperties[] = [
    {
        displayName: 'ID Plan Auxiliar',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planCuentaAuxiliar'], 
                operation: ['get', 'delete', 'getNiveles', 'getTamano'] 
            } 
        },
        description: 'Identificador numérico del Plan Auxiliar (idAuxi).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['planCuentaAuxiliar'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para "Por Origen".',
    },
];