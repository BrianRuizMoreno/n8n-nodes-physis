import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);    
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try {
        id = this.getNodeParameter('id', index) as string;
    } catch (e) {
    }

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) {
    }

    const baseUrl = '/phy2service/api/sifac/clientes/descuentos';

    switch (operation) {

        case 'getArbol':
            method = 'GET';
            endpoint = `${baseUrl}/arbol`;
            qs = jsonParameters; 
            break;
        case 'get':
            method = 'GET';
            endpoint = `${baseUrl}/${id}`;
            break;
        case 'getByAlias':
            const alias = jsonParameters.alias as string;
            if (!alias) throw new Error('El parámetro "alias" es obligatorio en el JSON Body para esta operación.');
            
            method = 'GET';
            endpoint = `/phy2service/api/sifac/clientes/descuentos-by-alias/${alias}`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}`;
            body = jsonParameters;
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}`;
            body = jsonParameters;
            break;
        case 'delete':
            method = 'DELETE';
            endpoint = `${baseUrl}/${id}`;
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