import { INodeProperties } from 'n8n-workflow';

export const tractorOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['silab'], resource: ['tractor'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', description: 'GET Devuelve lista de Tractores', action: 'Obtener Todos a tractor',},
			{ name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve datos de un Tractor', action: 'Obtener por ID a tractor',},
		],
		default: 'getAll',
	},
];

export const tractorFields: INodeProperties[] = [
	{
		displayName: 'ID Tractor',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: { show: { service: ['silab'], resource: ['tractor'], operation: ['get'] } },
	},
];