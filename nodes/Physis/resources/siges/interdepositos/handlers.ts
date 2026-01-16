import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {

        case 'get':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdComprobante: this.getNodeParameter('idComprobante', index) as number
            };
            break;
        case 'getNextId':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos-nextid`;
            break;
        case 'getMeans':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos-medios`;
            qs = {
                CodMedio: this.getNodeParameter('codMedio', index) as string,
                Exportable: this.getNodeParameter('exportable', index) as boolean
            };
            break;
        case 'getAllMeans':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos-medios/all`;
            qs = {
                CodMedio: this.getNodeParameter('codMedio', index) as string
            };
            break;
        case 'getLastExportDate':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos-ultimafecha`;
            break;
        case 'getShipmentNumbers':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos-numerosenvio`;
            qs = {
                fecha: this.getNodeParameter('fecha', index) as string
            };
            break;
        case 'getByDateAndShipment':
            method = 'GET';
            endpoint = `${baseUrl}/interdepositos-Fecha-numeroenvio`;
            qs = {
                fecha: this.getNodeParameter('fecha', index) as string,
                NumeroEnvio: this.getNodeParameter('numeroEnvio', index) as number
            };
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}