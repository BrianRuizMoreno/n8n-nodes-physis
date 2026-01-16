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
        case 'getCombo':
            const comboType = this.getNodeParameter('comboType', index) as string;
            method = 'GET';
            endpoint = `${baseUrl}/combos/${comboType}`;
            
            qs = {
                idPpal: this.getNodeParameter('idPpal', index) as number,
                idAuxi: this.getNodeParameter('idAuxi', index) as number,
            };
            break;

        case 'getSearchTypes':
            method = 'GET';
            endpoint = `${baseUrl}/combos-tipos-busqueda`;
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