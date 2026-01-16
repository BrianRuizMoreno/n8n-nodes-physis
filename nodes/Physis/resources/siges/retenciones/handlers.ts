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
        case 'getRegimes':
            method = 'GET';
            endpoint = `${baseUrl}/regimen-retenciones`;
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index) as number,
                idCtaPpal: this.getNodeParameter('idCtaPpal', index, '') as string
            };
            if (!qs.idCtaPpal) delete qs.idCtaPpal;
            break;

        case 'checkCertificateStatus':
            method = 'GET';
            endpoint = `${baseUrl}/certificado-retenciones`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdComprobante: this.getNodeParameter('idComprobante', index) as number
            };
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, {}, qs) as any;
    
    let data: IDataObject | IDataObject[] = [];

    if (operation === 'checkCertificateStatus' && typeof response === 'boolean') {
        data = [{ estado: response }];
    } else {
        data = (response.Datos || response) as IDataObject | IDataObject[];
    }

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}