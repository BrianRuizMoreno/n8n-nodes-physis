import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/savec';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let nroContrato = '';
    let codCampania = '';

    try { nroContrato = this.getNodeParameter('nroContrato', index) as string; } catch (e) {}
    try { codCampania = this.getNodeParameter('codCampania', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        if (operation === 'create') {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    switch (operation) {

        case 'getAll':
            endpoint = `${endpoint}/contratos`;
            break;
        case 'create':
            endpoint = `${endpoint}/contratos`;
            method = 'POST';
            break;
        case 'get':
            endpoint = `${endpoint}/campanias/${codCampania}/contratos/${nroContrato}`;
            break;
        case 'getContratosTerceros':
            endpoint = `${endpoint}/contratosTerceros`;
            break;
        case 'getCorredores':
            endpoint = `${endpoint}/contrato-corredores`;
            break;
        case 'getEntregadores':
            endpoint = `${endpoint}/entregadores`;
            break;
        case 'getTransportistas':
            endpoint = `${endpoint}/transportistas`;
            break;
        case 'getTerceros':
            endpoint = `${endpoint}/terceros`;
            break;
        case 'getMonedas':
            endpoint = `${endpoint}/monedas`;
            break;

        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}