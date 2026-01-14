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
        throw new Error('El ID del Grupo es obligatorio para estas operaciones.');
    }

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) {
    }

    const baseUrl = '/phy2service/api/sifac/grupos';

    switch (operation) {
        case 'getProductos':
            method = 'GET';
            endpoint = `${baseUrl}/${id}/productos`;
            qs = jsonParameters; 
            break;

        case 'getProductosRestricciones':
            method = 'GET';
            endpoint = `${baseUrl}/${id}/productos/restricciones`;
            qs = jsonParameters;
            break;

        case 'updateProductos':
            method = 'POST';
            endpoint = `${baseUrl}/${id}/productos`;
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