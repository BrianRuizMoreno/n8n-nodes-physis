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

    const baseUrl = '/phy2service/api/sifac/ccInsumos';

    qs = jsonParameters;

    switch (operation) {
        // --- PEDIDOS ---
        case 'getPedidosResumen':
            method = 'GET';
            endpoint = `${baseUrl}/pedidos-resumen`;
            break;
        case 'getPedidosDetalle':
            method = 'GET';
            endpoint = `${baseUrl}/pedidos-detalle`;
            break;
        // --- REMITOS ---
        case 'getRemitosResumen':
            method = 'GET';
            endpoint = `${baseUrl}/remitos-resumen`;
            break;
        case 'getRemitosDetalle':
            method = 'GET';
            endpoint = `${baseUrl}/remitos-detalle`;
            break;
        // --- FACTURAS ---
        case 'getFacturasResumen':
            method = 'GET';
            endpoint = `${baseUrl}/facturas-resumen`;
            break;
        case 'getFacturasDetalle':
            method = 'GET';
            endpoint = `${baseUrl}/facturas-detalle`;
            break;
        // --- ESPECÍFICOS ---
        case 'getComprobanteCumplimiento':
            method = 'GET';
            endpoint = `${baseUrl}/comprobantes-con-cumplimientos/${id}`;
            qs = {}; 
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