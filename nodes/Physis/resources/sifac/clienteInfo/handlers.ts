import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac/clientes';
    let qs: IDataObject = {};

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        qs = json as IDataObject; 
    } catch (e) {
    }

    switch (operation) {
        case 'getConexiones':
            endpoint += '/conexiones-contables';
            break;
        case 'getCondicionesPago':
            endpoint += '/condiciones-de-pagos';
            break;
        case 'getDescuentos':
            endpoint += '/descuentos';
            break;
        case 'getDescuentos2':
            endpoint += '/descuentos2';
            break;
        case 'getListasPrecios':
            endpoint += '/listas-de-precios';
            break;
        case 'getTopesCredito':
            endpoint += '/topes-de-creditos';
            break;
        case 'getZonas':
            endpoint += '/zonas';
            break;
        case 'getCondicionesVenta':
            endpoint += '/condiciones-de-ventas';
            break;
        case 'getTransportes':
            endpoint += '/transportes';
            break;
        case 'getDistribuidores':
            endpoint += '/distribuidores';
            break;
        case 'getVendedores':
            endpoint += '/vendedores';
            break;
        case 'getObservaciones':
            endpoint += '/observaciones';
            break;
        default:
            throw new Error(`Operación ${operation} no soportada.`);
    }

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}