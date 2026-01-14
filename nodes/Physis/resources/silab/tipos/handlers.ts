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

    const baseUrl = '/phy2service/api/silab';

    switch (operation) {

        case 'getAllTipos':
            method = 'GET';
            endpoint = `${baseUrl}/tipos`;
            break;
        case 'getTipo':
            method = 'GET';
            endpoint = `${baseUrl}/tipos/${id}`;
            break;

        case 'createTipo':
            method = 'POST';
            endpoint = `${baseUrl}/tipos`;
            body = jsonParameters;
            break;
        case 'updateTipo':
            method = 'PUT';
            endpoint = `${baseUrl}/tipos`;
            body = jsonParameters;
            break;

        case 'deleteTipo':
            method = 'DELETE';
            endpoint = `${baseUrl}/tipos`;
            qs = { sigla: id }; 
            break;
        case 'getAllTiposFormulario':
            method = 'GET';
            endpoint = `${baseUrl}/tipos-formulario`;
            break;

        case 'getTipoFormulario':
            method = 'GET';
            endpoint = `${baseUrl}/tipos-formulario/${id}`;
            break;
        case 'updateTipoFormulario':
            method = 'PUT';
            endpoint = `${baseUrl}/tipos-formulario`;
            body = jsonParameters;
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