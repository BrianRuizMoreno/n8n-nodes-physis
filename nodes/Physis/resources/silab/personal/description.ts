import { INodeProperties } from 'n8n-workflow';

export const personalOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['silab'], resource: ['personal'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', description: 'GET Devuelve lista de Personal', action: 'Obtener todos a personal',},
			{ name: 'Obtener Por ID', value: 'get', description: 'GET Devuelve datos de un Empleado por su ID', action: 'Obtener por ID a personal',},
			{ name: 'Obtener por Labor', value: 'getByLabor', description: 'GET Devuelve Personal asociado a una Labor', action: 'Obtener por labor a personal',},
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