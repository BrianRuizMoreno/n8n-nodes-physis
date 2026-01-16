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
            endpoint = `${baseUrl}/billeteras`;
            break;
        case 'get':
            const idAuxi = this.getNodeParameter('idAuxi', index) as number;
            const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
            method = 'GET';
            endpoint = `${baseUrl}/billeteras/${idAuxi}/${idCtaAuxi}`;
            break;
        case 'getPendingMovements':
            method = 'GET';
            endpoint = `${baseUrl}/billeteras/movimientos-sin-informar`;
            break;
        case 'updateMovementStatus':
            method = 'PUT';
            endpoint = `${baseUrl}/billeteras/movimientos-sin-informar`;
            qs = {
                idMov: this.getNodeParameter('idMov', index) as number,
                posicion: this.getNodeParameter('posicion', index) as number
            };
            break;
        case 'createOperation':
            method = 'POST';
            endpoint = `${baseUrl}/billeteras/bica/operaciones`;
            body = jsonParameters; 
            break;

        case 'processDailyBalance':
            method = 'POST';
            endpoint = `${baseUrl}/billeteras/bica/balances/diario`;
            body = jsonParameters; 
            break;
        case 'refreshBalances':
            method = 'POST';
            endpoint = `${baseUrl}/billeteras/bica/saldos`;
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