import { INodeProperties } from 'n8n-workflow';

export const recursoCampoOperations: INodeProperties[] = [
	{
		displayName: 'Operación',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { service: ['silab'], resource: ['recursoCampo'] } },
		options: [
			{ name: 'Listar Maquinarias', value: 'getAllMaquinarias', description: 'GET Devuelve lista de Maquinarias.' },
			{ name: 'Buscar Maquinaria por Nombre', value: 'getMaquinariaByName', description: 'GET Devuelve datos de Maquinarias por Nombre.' },
		],
		default: 'getAllMaquinarias',
	},
];

export const recursoCampoFields: INodeProperties[] = [
	{
		displayName: 'Nombre Maquinaria',
		name: 'id', 
		type: 'string',
		default: '',
		displayOptions: { show: { service: ['silab'], resource: ['recursoCampo'], operation: ['getMaquinariaByName'] } },
	},
];