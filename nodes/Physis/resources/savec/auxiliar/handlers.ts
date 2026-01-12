import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    const method = 'GET';
    let qs: IDataObject = {};

    try {
        if (operation === 'getCampanias') {
            const incluirRowTodos = this.getNodeParameter('incluirRowTodos', index) as boolean;
            qs.incluirRowTodos = incluirRowTodos;
        }
        else if (operation === 'getCereales') {
            const todos = this.getNodeParameter('incluirRowTodos', index) as boolean;
            qs.todos = todos;
        }
        else if (operation === 'getCerealesStock') {
            const codCampania = this.getNodeParameter('codCampania', index) as number;
            const fecha = this.getNodeParameter('fecha', index) as string;
            qs.codCampania = codCampania;
            qs.fecha = fecha;
        }
    } catch (e) {
    }

    if (operation === 'getCampanias') {
        endpoint = `${endpoint}/campanias`;
    }
    else if (operation === 'getCampaniasUsuario') {
        const idUsuario = this.getNodeParameter('idUsuario', index) as string;
        endpoint = `${endpoint}/usuarios/${idUsuario}/campanias`;
    }
    else if (operation === 'getCereales') {
        endpoint = `${endpoint}/cereales`;
    }
    else if (operation === 'getCerealesStock') {
        endpoint = `${endpoint}/cereales/stock`;
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}