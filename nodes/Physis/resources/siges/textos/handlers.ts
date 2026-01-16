import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    switch (operation) {
        case 'getAll':
            method = 'GET';
            endpoint = `${baseUrl}/textos`;
            
            const tipoTexto = this.getNodeParameter('tipoTexto', index) as number;
            if (tipoTexto !== 0) {
                qs = { TipoTexto: tipoTexto };
            }
            break;
        case 'get':
            const id = this.getNodeParameter('idTexto', index) as number;
            method = 'GET';
            endpoint = `${baseUrl}/textos/${id}`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/textos`;
            body = jsonParameters;
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/textos`;
            body = jsonParameters;
            break;
        case 'delete':
            method = 'DELETE';
            endpoint = `${baseUrl}/textos`;
            qs = {
                idTexto: this.getNodeParameter('idTexto', index) as number
            };
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}