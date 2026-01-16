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
            endpoint = `${baseUrl}/historia`;
            qs = {
                codigohistoria: this.getNodeParameter('codigohistoria', index) as string,
                servidor: this.getNodeParameter('servidor', index) as string,
                key: this.getNodeParameter('key', index) as string
            };
            
            if (!qs.servidor) delete qs.servidor;
            if (!qs.key) delete qs.key;
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