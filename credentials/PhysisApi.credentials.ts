import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PhysisApi implements ICredentialType {
	name = 'physisApi';
	displayName = 'Physis API';
	documentationUrl = 'https://dev.physis.com.ar';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			description: 'URL base de la API (ej. https://servidor.com)',
		},
		{
			displayName: 'Authorization Header',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Bearer token para la cabecera Authorization',
		},
	];
}