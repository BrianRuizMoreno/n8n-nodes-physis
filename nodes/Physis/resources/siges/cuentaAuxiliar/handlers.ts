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
    } catch (e) { }

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {
        case 'getAll':
            method = 'GET';
            endpoint = `${baseUrl}/cuentas-auxi`;
            break;

        case 'get':
            method = 'GET';
            endpoint = `${baseUrl}/cuentas-auxi/${id}`;
            break;

        case 'getByPlan':
            const idAuxi = this.getNodeParameter('idAuxi', index) as number;
            method = 'GET';
            endpoint = `${baseUrl}/planes-ctas-auxiliares/${idAuxi}/cuentas`;
            qs = jsonParameters; 
            break;

        case 'getNextId':
            method = 'GET';
            endpoint = `${baseUrl}/cuentas-auxi/siguiente`;
            qs = jsonParameters; 
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/cuentas-auxi`;
            body = jsonParameters; 
            
            qs = {
                convenioMultilateral: this.getNodeParameter('convenioMultilateral', index, false),
                obligadoDirecto: this.getNodeParameter('obligadoDirecto', index, false)
            };
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/cuentas-auxi`;
            body = jsonParameters;
            break;

        case 'delete':
            method = 'DELETE';
            endpoint = `${baseUrl}/cuentas-auxi`;
            qs = jsonParameters; 
            break;
        case 'getTree':
            method = 'GET';
            endpoint = `${baseUrl}/cuentas-auxiliares/arbol`;
            qs = jsonParameters;
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