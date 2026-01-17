import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const transport = new PhysisTransport(this);
	
	let endpoint = '/phy2service/api/savec';
	let method = 'GET';
	let body: IDataObject = {};
	let qs: IDataObject = {}; 

	switch (operation) {
		case 'getCampanias':
			endpoint = `${endpoint}/campanias`;
			const incluirRowTodosCamp = this.getNodeParameter('incluirRowTodos', index, false) as boolean;
			qs.incluirRowTodos = incluirRowTodosCamp;
			break;
		case 'getCampaniasUsuario': {
			const idUsuario = this.getNodeParameter('idUsuario', index, '') as string;
			endpoint = `${endpoint}/usuarios/${idUsuario}/campanias`;
			break;
		}
		case 'getCereales':
			endpoint = `${endpoint}/cereales`;
			const todos = this.getNodeParameter('incluirRowTodos', index, false) as boolean;
			qs.todos = todos;
			break;
		case 'getCerealesStock':
			endpoint = `${endpoint}/cereales/stock`;
			qs.codCampania = this.getNodeParameter('codCampania', index) as number;
			qs.fecha = this.getNodeParameter('fecha', index) as string;
			break;
	}

	const rawJson = this.getNodeParameter('jsonBody', index, '') as string;

	if (rawJson) {
		try {
			const json = JSON.parse(rawJson) as IDataObject;
			qs = { ...qs, ...json };
		} catch (error) {
			throw new Error(`JSON body inválido: ${(error as Error).message}`);
		}
	}

	const response = await transport.request(method, endpoint, body, qs) as IDataObject;
	const data = (response.Datos || response) as IDataObject | IDataObject[];

	return Array.isArray(data) 
		? data.map((item) => ({ json: item })) 
		: [{ json: data as IDataObject }];
}