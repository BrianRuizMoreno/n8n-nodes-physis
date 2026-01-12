import { INodeProperties } from 'n8n-workflow';

export const tractorOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['silab'], resource: ['tractor'] } },
		options: [
			{ name: 'Obtener Todos', value: 'getAll', description: 'GET Devuelve lista de Tractores.' },
			{ name: 'Obtener por ID', value: 'get', description: 'GET Devuelve datos de un Tractor.' },
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