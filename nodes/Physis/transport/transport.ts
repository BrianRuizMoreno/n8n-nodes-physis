import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	NodeApiError,
	JsonObject,
} from 'n8n-workflow';

export class PhysisTransport {
	constructor(
		private readonly functions: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	) {}

	async request(
		method: string,
		endpoint: string,
		body: IDataObject = {},
		qs: IDataObject = {},
	): Promise<any> {
		const credentials = await this.functions.getCredentials('physisApi');
		
		// Normalización de URL
		let baseUrl = credentials.baseUrl as string;
		if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
		if (!endpoint.startsWith('/')) endpoint = `/${endpoint}`;

		const options = {
			method,
			uri: `${baseUrl}${endpoint}`,
			body,
			qs,
			json: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${credentials.token}`,
			},
		};

		try {
			// @ts-ignore
			return await this.functions.helpers.request(options);
		} catch (error) {
			throw new NodeApiError(this.functions.getNode(), error as JsonObject);
		}
	}

    // Helper para búsquedas paginadas o listas simples que usan el patrón "GetAll"
	async getAll(endpoint: string, qs: IDataObject = {}): Promise<any> {
		return this.request('GET', endpoint, {}, qs);
	}
}