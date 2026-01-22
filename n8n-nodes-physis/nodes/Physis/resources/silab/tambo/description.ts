import { INodeProperties } from 'n8n-workflow';

export const tamboOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['silab'], resource: ['tambo'] } },
		options: [
			{ name: 'Obtener Campos', value: 'getCampos', description: 'GET Obtener datos de Campos', action: 'Obtener campos a tambo',},
			{ name: 'Obtener Actividades', value: 'getActividades', description: 'GET Obtener datos de Actividades', action: 'Obtener actividades a tambo',},
			{ name: 'Producción Diaria', value: 'getProduccionDiaria', description: 'GET Obtener datos de Producción Diaria por Campo', action: 'Producci n diaria a tambo',},
			{ name: 'Producción Individual', value: 'getProduccionIndividual', description: 'GET Obtener datos de Producción Individual por Campo', action: 'Producci n individual a tambo',},
		],
		default: 'getCampos',
	},
];

export const tamboFields: INodeProperties[] = [
	{
		displayName: 'ID Campo',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: { show: { service: ['silab'], resource: ['tambo'], operation: ['getProduccionDiaria', 'getProduccionIndividual'] } },
	},
	{
		displayName: 'Filtros (JSON)',
		name: 'jsonBody',
		type: 'json',
		default: '{}',
		displayOptions: { show: { service: ['silab'], resource: ['tambo'], operation: ['getProduccionDiaria', 'getProduccionIndividual'] } },
		description: 'Parámetros adicionales para la consulta (FechaDesde, FechaHasta, etc)',
	},
];