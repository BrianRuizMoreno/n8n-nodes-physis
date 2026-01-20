import { INodeProperties } from 'n8n-workflow';

export const cerealOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['sacer'], resource: ['cereal'] } },
		options: [
			{ 
				name: 'Calidades: Actualizar', 
				value: 'updateCalidad', 
				description: 'PUT Modifica una calidad', 
				action: 'Calidades actualizar a cereal',
			},
			{ 
				name: 'Calidades: Agrupaciones (Por Cereal)', 
				value: 'getAgrupacionesPorCereal', 
				description: 'GET Agrupaciones de calidades de un cereal', 
				action: 'Calidades agrupaciones por cereal a cereal',
			},
			{ 
				name: 'Calidades: Agrupaciones (Por ID)', 
				value: 'getAgrupacion', 
				description: 'GET Una agrupación específica por ID', 
				action: 'Calidades agrupaciones por id a cereal',
			},
			{ 
				name: 'Calidades: Consulta Avanzada', 
				value: 'getCalidadesGrid', 
				description: 'POST Consulta con filtros, paginado y orden (Grid)', 
				action: 'Calidades consulta avanzada a cereal',
			},
			{ 
				name: 'Calidades: Crear', 
				value: 'createCalidad', 
				description: 'POST Crea una nueva calidad', 
				action: 'Calidades crear a cereal',
			},
			{ 
				name: 'Calidades: Eliminar', 
				value: 'deleteCalidad', 
				description: 'DELETE Elimina una calidad', 
				action: 'Calidades eliminar a cereal',
			},
			{ 
				name: 'Calidades: Listar', 
				value: 'getCalidades', 
				description: 'GET Lista calidades. Filtro opcional: { "codCereal": 1 }.', 
				action: 'Calidades listar a cereal',
			},
			{ 
				name: 'Calidades: Obtener', 
				value: 'getCalidad', 
				description: 'GET Obtiene una calidad por código', 
				action: 'Calidades obtener a cereal',
			},
			{ 
				name: 'Calidades: Por Cereal', 
				value: 'getCalidadesPorCereal', 
				description: 'GET Calidades asociadas a un ID Cereal', 
				action: 'Calidades por cereal a cereal',
			},
			{ 
				name: 'Cereales: Actualizar', 
				value: 'updateCereal', 
				description: 'PUT Modifica un cereal existente', 
				action: 'Cereales actualizar a cereal',
			},
			{ 
				name: 'Cereales: Agregar Productos', 
				value: 'addProductosCereal', 
				description: 'POST Asocia productos a un cereal', 
				action: 'Cereales agregar productos a cereal',
			},
			{ 
				name: 'Cereales: Consulta Avanzada', 
				value: 'getCerealesGrid', 
				description: 'POST Consulta con filtros, paginado y orden (Grid)', 
				action: 'Cereales consulta avanzada a cereal',
			},
			{ 
				name: 'Cereales: Crear', 
				value: 'createCereal', 
				description: 'POST Crea un nuevo cereal', 
				action: 'Cereales crear a cereal',
			},
			{ 
				name: 'Cereales: Eliminar', 
				value: 'deleteCereal', 
				description: 'DELETE Elimina un cereal', 
				action: 'Cereales eliminar a cereal',
			}, 
			{ 
				name: 'Cereales: Listar', 
				value: 'getCereales', 
				description: 'GET Lista de cereales', 
				action: 'Cereales listar a cereal',
			},
			{ 
				name: 'Cereales: Listar Productos', 
				value: 'getProductosCereal', 
				description: 'GET Productos asociados a un cereal', 
				action: 'Cereales listar productos a cereal',
			},
			{ 
				name: 'Cereales: Listar Variedades', 
				value: 'getVariedades', 
				description: 'GET Variedades de un cereal específico', 
				action: 'Cereales listar variedades a cereal',
			},
			{ 
				name: 'Cereales: Obtener', 
				value: 'getCereal', 
				description: 'GET Datos de un cereal por ID', 
				action: 'Cereales obtener a cereal',
			},
		],
		default: 'getCereales',
	},
];

export const cerealFields: INodeProperties[] = [
	{
		displayName: 'ID Cereal / Calidad',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { 
			show: { 
				service: ['sacer'], 
				resource: ['cereal'], 
				operation: [
					'getCereal', 'deleteCereal', 
					'getVariedades', 'getProductosCereal', 'addProductosCereal',
					'getCalidad', 'deleteCalidad',
					'getCalidadesPorCereal', 'getAgrupacionesPorCereal', 'getAgrupacion'
				] 
			} 
		},
		description: 'ID del Cereal, Código de Calidad o ID de Agrupación',
	},
	{
		displayName: 'JSON Body / Filtros',
		name: 'jsonBody',
		type: 'json',
		default: '{}',
		displayOptions: { 
			show: { 
				service: ['sacer'], 
				resource: ['cereal'],
				operation: [
					'getCerealesGrid', 
					'createCereal', 'updateCereal', 'addProductosCereal',
					'getCalidades', 'getCalidadesGrid',
					'createCalidad', 'updateCalidad'
				] 
			} 
		},
		description: 'Cuerpo para Crear/Actualizar, Filtros Grid, o Lista de Productos',
	},
];

export const description: INodeProperties[] = [
	...cerealOperations,
	...cerealFields,
];