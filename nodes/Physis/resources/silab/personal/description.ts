import { INodeProperties } from 'n8n-workflow';

export const personalOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['silab'], resource: ['personal'] } },
		options: [
			{ name: 'Obtener Todos', value: 'getAll', description: 'GET Devuelve lista de Personal.' },
			{ name: 'Obtener por ID', value: 'get', description: 'GET Devuelve datos de un Empleado por su Id.' },
			{ name: 'Obtener por Labor', value: 'getByLabor', description: 'GET Devuelve Personal asociado a una Labor' },
		],
		default: 'getAll',
	},
];

export const personalFields: INodeProperties[] = [
	{
		displayName: 'ID Personal / Labor',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: { show: { service: ['silab'], resource: ['personal'], operation: ['get', 'getByLabor'] } },
	},
];