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

    const baseUrl = `/phy2service/api/sifac/grupos/${id}/proveedores`;

    switch (operation) {
        // --- CONDICIONES DE PAGO ---
        case 'getCondicionesPago':
            method = 'GET';
            endpoint = `${baseUrl}/condiciones-de-pagos`;
            qs = jsonParameters;
            break;
        case 'updateCondicionesPago':
            method = 'POST';
            endpoint = `${baseUrl}/condiciones-de-pagos`;
            body = jsonParameters;
            break;

        // --- DESCUENTOS ---
        case 'getDescuentos':
            method = 'GET';
            endpoint = `${baseUrl}/descuentos`;
            qs = jsonParameters;
            break;
        case 'updateDescuentos':
            method = 'POST';
            endpoint = `${baseUrl}/descuentos`;
            body = jsonParameters;
            break;

        // --- CONEXIONES CONTABLES ---
        case 'getConexionesContables':
            method = 'GET';
            endpoint = `${baseUrl}/conexiones-contables`;
            qs = jsonParameters;
            break;
        case 'updateConexionesContables':
            method = 'POST';
            endpoint = `${baseUrl}/conexiones-contables`;
            body = jsonParameters;
            break;

        // --- TOPES DE CRÉDITO ---
        case 'getTopesCredito':
            method = 'GET';
            endpoint = `${baseUrl}/topes-de-creditos`;
            qs = jsonParameters;
            break;
        case 'updateTopesCredito':
            method = 'POST';
            endpoint = `${baseUrl}/topes-de-creditos`;
            body = jsonParameters;
            break;

        // --- VENDEDORES (COMPRADORES) ---
        case 'getVendedores':
            method = 'GET';
            endpoint = `${baseUrl}/vendedores`;
            qs = jsonParameters;
            break;
        case 'updateVendedores':
            method = 'POST';
            endpoint = `${baseUrl}/vendedores`;
            body = jsonParameters;
            break;

        // --- OBSERVACIONES ---
        case 'getObservaciones':
            method = 'GET';
            endpoint = `${baseUrl}/observaciones`;
            qs = jsonParameters;
            break;
        case 'updateObservaciones':
            method = 'POST';
            endpoint = `${baseUrl}/observaciones`;
            body = jsonParameters;
            break;

        // --- TRANSPORTES ---
        case 'getTransportes':
            method = 'GET';
            endpoint = `${baseUrl}/transportes`;
            qs = jsonParameters;
            break;
        case 'updateTransportes':
            method = 'POST';
            endpoint = `${baseUrl}/transportes`;
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