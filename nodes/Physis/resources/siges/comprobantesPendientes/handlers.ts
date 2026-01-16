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
            endpoint = `${baseUrl}/comprobantes-pendientes`;
            body = jsonParameters; 
            break;
        case 'getDetailed':
            method = 'GET';
            endpoint = `${baseUrl}/comprobamtes-pendientes-all-detallados`;
            body = jsonParameters;
            break;
        case 'get':
            const id = this.getNodeParameter('idComprobante', index) as number;
            method = 'GET';
            endpoint = `${baseUrl}/comprobantes-pendientes/${id}`;
            qs = {
                IdUsuario: this.getNodeParameter('idUsuario', index, 0) as number
            };
            if (qs.IdUsuario === 0) delete qs.IdUsuario;
            break;
        case 'getSummary':
            method = 'GET';
            endpoint = `${baseUrl}/comprobantes-pendientes-all-cantidades`;
            body = jsonParameters;
            break;
        case 'getErrorCounts':
            method = 'GET';
            endpoint = `${baseUrl}/comprobantes-pendientes-cuantos-erroneos`;
            qs = {
                idPpal: this.getNodeParameter('idPpal', index) as number,
                IdUsuario: this.getNodeParameter('idUsuario', index) as number
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