import { INodeProperties } from 'n8n-workflow';

export const tarifasOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['savec'], resource: ['tarifas'] } },
		options: [
			{ name: 'Listar Tarifas Cosechero', value: 'getCosechero', description: 'GET Lista tarifas de cosechero por campo y cereal.' },
			{ name: 'Crear Tarifas Cosechero', value: 'createCosechero', description: 'POST Inserta una lista de tarifas de cosechero.' },
			{ name: 'Eliminar Tarifas Cosechero', value: 'deleteCosechero', description: 'DELETE Elimina tarifas de cosechero.' },
			
			{ name: 'Listar Tarifas Secado', value: 'getSecado', description: 'GET Lista tarifas de secado por planta y cereal.' },
			{ name: 'Crear Tarifas Secado', value: 'createSecado', description: 'POST Inserta una lista de tarifas de secado.' },
			{ name: 'Eliminar Tarifas Secado', value: 'deleteSecado', description: 'DELETE Elimina tarifas de secado.' },
		],
		default: 'getCosechero',
	},
];

export const tarifasFields: INodeProperties[] = [
	{
		displayName: 'Código Cereal',
		name: 'codCereal',
		type: 'number',
		default: 0,
		displayOptions: { 
			show: { 
				service: ['savec'], 
				resource: ['tarifas'],
				operation: ['getCosechero', 'deleteCosechero', 'getSecado', 'deleteSecado']
			} 
		},
		description: 'Código del cereal para filtrar las tarifas.',
	},
	{
		displayName: 'Código Campo',
		name: 'codCampo',
		type: 'number',
		default: 0,
		displayOptions: { 
			show: { 
				service: ['savec'], 
				resource: ['tarifas'],
				operation: ['getCosechero', 'deleteCosechero']
			} 
		},
		description: 'Código del campo asociado a la tarifa de cosecha.',
	},
	{
		displayName: 'Código Planta',
		name: 'codPlanta',
		type: 'number',
		default: 0,
		displayOptions: { 
			show: { 
				service: ['savec'], 
				resource: ['tarifas'],
				operation: ['getSecado', 'deleteSecado']
			} 
		},
		description: 'Código de la planta asociada a la tarifa de secado.',
	},
	{
		displayName: 'JSON Body (Array)',
		name: 'jsonBody',
		type: 'json',
		default: '[]',
		displayOptions: { 
			show: { 
				service: ['savec'], 
				resource: ['tarifas'],
				operation: ['createCosechero', 'createSecado']
			} 
		},
		description: 'Lista de objetos tarifa a insertar. Ej: [{"kilosDesde": 0, ...}].',
	},
];