import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);

    let endpoint = '/phy2service/api/sacer/campanias';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {}; 

    const id = this.getNodeParameter('id', index, '') as string;
    const idUsuario = this.getNodeParameter('idUsuario', index, '') as string;

    try {
        const jsonBody = this.getNodeParameter('jsonBody', index, '') as string;
        if (jsonBody) {
            const json = JSON.parse(jsonBody);
            body = json as IDataObject;
        }
    } catch (error) {
        throw new Error(`JSON body inválido: ${error.message}`);
    }

    if (operation === 'getAll') {
    } else if (operation === 'create') {
        method = 'POST';
    } else if (operation === 'update') {
        method = 'PUT';
    } else if (operation === 'delete') {
        endpoint = `${endpoint}/${id}`;
        method = 'DELETE';
    } else if (operation === 'getByUser') {
        endpoint = `/phy2service/api/sacer/usuarios/${idUsuario}/campanias`;
    } else if (operation === 'getDetailByUser') {
        endpoint = `/phy2service/api/sacer/usuarios/${idUsuario}/campanias/${id}`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data as IDataObject }];
}