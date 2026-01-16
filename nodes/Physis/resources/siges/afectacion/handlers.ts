import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {
        case 'getPending':
            method = 'GET';
            endpoint = `${baseUrl}/afectacion/cabeceras`;
            qs = {
                Comprobante: this.getNodeParameter('comprobante', index, '') as string,
                Estado: this.getNodeParameter('estado', index) as number,
                Signo: this.getNodeParameter('signo', index) as number,
                ...jsonParameters
            };
            if (!qs.Comprobante) delete qs.Comprobante;
            break;

        case 'getAffectedDetails':
            method = 'GET';
            endpoint = `${baseUrl}/afectacion/comprobanteafectado`;
            qs = {
                Comprobante: this.getNodeParameter('comprobante', index) as string,
                Estado: this.getNodeParameter('estado', index) as number,
                Signo: this.getNodeParameter('signo', index) as number,
                ...jsonParameters
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