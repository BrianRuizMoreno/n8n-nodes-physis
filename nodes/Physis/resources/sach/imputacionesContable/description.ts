import { INodeProperties } from 'n8n-workflow';

export const imputacionContableOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
			},
		},
		options: [
			{ name: 'Listar Todas', value: 'getAll', description: 'GET Devuelve el listado de imputaciones contables.' },
			{ name: 'Obtener por ID', value: 'get', description: 'GET Devuelve una imputación específica.' },
			{ name: 'Crear', value: 'create', description: 'POST Inserta una nueva imputación contable.' },
			{ name: 'Actualizar', value: 'update', description: 'PUT Modifica una imputación existente.' },
			{ name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una imputación.' },
			{ name: 'Listar Regímenes', value: 'getRegimenes', description: 'GET Devuelve una lista de regímenes de imputación.' },
		],
		default: 'getAll',
	},
];

export const imputacionContableFields: INodeProperties[] = [

	{
		displayName: 'Cód Imputación',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['get', 'delete'],
			},
		},
		description: 'Identificador único de la imputación (codImputacion).',
	},
	{
		displayName: 'JSON Body',
		name: 'jsonBody',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['create', 'update'],
			},
		},
		description: 'Cuerpo con los datos de la imputación (cuentas, códigos, descripción).',
	},
	{
		displayName: 'Cod Cereal',
		name: 'codCereal',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['getAll'],
			},
		},
		description: 'Filtra por código de cereal (0 para todos).',
	},
	{
		displayName: 'Cod Planta',
		name: 'codPlanta',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['getAll'],
			},
		},
		description: 'Filtra por código de planta (0 para todas).',
	},
	{
		displayName: 'Cod Tipo Formulario',
		name: 'codTipoFormulario',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['getAll'],
			},
		},
		description: 'Filtra por tipo de formulario.',
	},
	{
		displayName: 'Cod Clase',
		name: 'codClase',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['getAll'],
			},
		},
		description: 'Filtra por clase de operación.',
	},
	{
		displayName: 'Reten/Percep',
		name: 'retenPercep',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['getAll'],
			},
		},
		description: 'Filtra por tipo de retención o percepción.',
	},
	{
		displayName: 'ID Cta Ppal',
		name: 'idCtaPpal',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				service: ['sacer'],
				resource: ['imputacionContable'],
				operation: ['getRegimenes'],
			},
		},
		description: 'Filtra regímenes por cuenta principal.',
	},
];