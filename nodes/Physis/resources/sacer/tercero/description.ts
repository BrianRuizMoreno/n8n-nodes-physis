import { INodeProperties } from 'n8n-workflow';

export const terceroOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['tercero'],
			},
		},
		options: [
			{ name: 'Productores: Listar', value: 'getProductores', description: 'GET Devuelve lista de productores.' },
			{ name: 'Corredores: Listar', value: 'getCorredores', description: 'GET Devuelve lista de corredores.' },
			{ name: 'Transportistas: Listar', value: 'getTransportistas', description: 'GET Devuelve lista de transportistas.' },
			{ name: 'Por Tipo: Listar', value: 'getByTipo', description: 'GET Obtiene terceros filtrando por tipo.' },
			{ name: 'Domicilios: Listar', value: 'getDomicilios', description: 'GET Obtiene lista de domicilios de un tercero.' },
			{ name: 'Domicilio: Detalle', value: 'getDomicilio', description: 'GET Obtiene un domicilio específico de un tercero.' },
		],
		default: 'getProductores',
	},
];

export const terceroFields: INodeProperties[] = [

	{
		displayName: 'Cod Tipo Tercero',
		name: 'codTipoTercero',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['tercero'],
				operation: ['getByTipo'],
			},
		},
		description: 'Código del tipo de tercero a listar.',
	},
	{
		displayName: 'ID Auxi (Titular)',
		name: 'idAuxi',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['tercero'],
				operation: ['getDomicilios', 'getDomicilio'],
			},
		},
		description: 'Identificador del tercero.',
	},
	{
		displayName: 'ID Cta Auxi (Cuenta)',
		name: 'idCtaAuxi',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['tercero'],
				operation: ['getDomicilios', 'getDomicilio'],
			},
		},
		description: 'Código de cuenta del tercero (Ej: PRO, CLI).',
	},
	{
		displayName: 'Cod Domicilio',
		name: 'codDomicilio',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['tercero'],
				operation: ['getDomicilio'],
			},
		},
		description: 'Código específico del domicilio.',
	},
];