import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/clientes';
    const method = 'GET'; 
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        qs = json as IDataObject;
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = endpoint;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'getPendientesEmision') {
        endpoint = `${endpoint}/pendientesdeemision`;
    }
    else if (operation === 'getSubcuentas') {
        endpoint = `${endpoint}/subcuentas`;
    }
    else if (operation === 'getCategoriasRfocb') {
        endpoint = `${endpoint}/categorias-rfocb`;
    }
    else if (operation === 'getAllCategoriasRfocb') {
        endpoint = `${endpoint}/categorias-rfocb/all`;
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}