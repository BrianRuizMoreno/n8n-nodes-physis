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
        case 'getAll':
            method = 'GET';
            endpoint = `${baseUrl}/modelos`;
            
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index) as number,
                IdTipoComprobante: this.getNodeParameter('idTipoComprobante', index, '') as string
            };
            
            if (!qs.IdTipoComprobante) delete qs.IdTipoComprobante;
            if (!qs.IdPpal) delete qs.IdPpal;
            break;

        case 'get':
            const id = this.getNodeParameter('idModelo', index) as number;
            method = 'GET';
            endpoint = `${baseUrl}/modelos/${id}`;
            
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index) as number
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