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

    const baseUrl = '/phy2service/api/sifac';

    switch (operation) {
        // --- CATÁLOGO Y BÚSQUEDA ---
        case 'getAll':
            method = 'GET';
            endpoint = `${baseUrl}/productos`;
            qs = jsonParameters; 
            break;

        case 'getArbol':
            method = 'GET';
            endpoint = `${baseUrl}/productos/arbol`;
            qs = jsonParameters; 
            break;

        case 'getConsultaGrid':
            method = 'POST';
            endpoint = `${baseUrl}/productos/consultar`;
            body = jsonParameters; 
            break;

        case 'getEstructura':
            method = 'GET';
            endpoint = `${baseUrl}/productos/estructura-de-productos`;
            qs = jsonParameters;
            break;

        // --- STOCK Y EXISTENCIAS ---
        case 'getStockDisponible':
            method = 'GET';
            endpoint = `${baseUrl}/productos/${id}/stock-disponible`;
            qs = jsonParameters;
            break;

        case 'getSaldos':
            method = 'GET';
            endpoint = `${baseUrl}/saldos/productos/${id}`;
            qs = jsonParameters; 
            break;

        case 'getPesos':
            method = 'GET';
            endpoint = `${baseUrl}/productos/${id}/pesos`;
            qs = jsonParameters;
            break;

        // --- PRECIOS ---
        case 'getPrecios':
            method = 'GET';
            endpoint = `${baseUrl}/precios/productos/${id}`;
            qs = jsonParameters; 
            break;

        case 'updatePrecios':
            method = 'POST';
            endpoint = `${baseUrl}/productos/${id}/lista-precios`;
            body = jsonParameters; 
            break;

        case 'getPreciosExistencia':
            method = 'GET';
            endpoint = `${baseUrl}/productos/precios-existencia`;
            qs = jsonParameters;
            break;

        // --- CONFIGURACIÓN Y BLOQUEOS ---
        case 'getSettings':
            method = 'GET';
            endpoint = `${baseUrl}/productos/${id}/settings`;
            break;

        case 'blockProducto':
            method = 'POST';
            endpoint = `${baseUrl}/productos/piezas/bloqueo`;
            body = jsonParameters;
            break;

        case 'unblockProducto':
            method = 'POST';
            endpoint = `${baseUrl}/productos/piezas/desbloqueo`;
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