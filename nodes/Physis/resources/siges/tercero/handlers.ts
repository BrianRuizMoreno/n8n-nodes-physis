import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let idAuxi = 0;
    let idCtaAuxi = '';

    if (['get', 'getAddresses', 'createAddress'].includes(operation)) {
        idAuxi = this.getNodeParameter('idAuxi', index) as number;
        idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
    }

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {

        case 'search':
            method = 'GET';
            endpoint = `${baseUrl}/terceros`;
            qs = {
                texto: this.getNodeParameter('texto', index, '') as string,
                idAuxi: this.getNodeParameter('idAuxiFilter', index, 0) as number,
                ...jsonParameters 
            };
            if (!qs.idAuxi) delete qs.idAuxi;
            break;
        case 'get':
            method = 'GET';
            endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}`;
            break;
        case 'getByDocument':
            method = 'GET';
            endpoint = `${baseUrl}/terceros-nrodoc`;
            qs = { NroDoc: this.getNodeParameter('nroDoc', index) as string };
            break;
        case 'query':
            method = 'POST';
            endpoint = `${baseUrl}/terceros/consulta`;
            body = jsonParameters; 
            break;
        case 'getAddresses':
            method = 'GET';
            endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}/domicilios`;
            break;
        case 'createAddress':
            method = 'POST';
            endpoint = `${baseUrl}/terceros/${idAuxi}/${idCtaAuxi}/domicilios`;
            body = {
                idAuxi,
                idCtaAuxi,
                ...jsonParameters 
            };
            break;
        case 'getBankAccounts':
            method = 'GET';
            endpoint = `${baseUrl}/terceroscuentasbancarias`;
            qs = jsonParameters; 
            break;
        case 'getContacts':
            method = 'GET';
            endpoint = `${baseUrl}/terceros/contactosreagrupados`;
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