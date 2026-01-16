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
            endpoint = `${baseUrl}/conceptos-IVA`;
            break;
        case 'get':
            const id = this.getNodeParameter('idConceptoIVA', index) as number;
            method = 'GET';
            endpoint = `${baseUrl}/conceptos-IVA/${id}`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/conceptos-IVA`;
            body = jsonParameters;
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/conceptos-IVA`;
            body = jsonParameters;
            break;
        case 'delete':
            method = 'DELETE';
            endpoint = `${baseUrl}/conceptos-IVA`;
            qs = {
                idConceptoIVA: this.getNodeParameter('idConceptoIVA', index) as number
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