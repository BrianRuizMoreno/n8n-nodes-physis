import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/compradoresremate';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    try {
        const idPuestoCarga = this.getNodeParameter('idPuestoCarga', index) as string;
        if (idPuestoCarga) qs.IdPuestoCarga = idPuestoCarga;

        const idRemateFeria = this.getNodeParameter('idRemateFeria', index) as string;
        if (idRemateFeria) qs.IdRemateFeria = idRemateFeria;

        const idCtaAuxi = this.getNodeParameter('idCtaAuxi', index) as string;
        if (idCtaAuxi) qs.idCtaAuxi = idCtaAuxi;
    } catch (e) {
    }

    if (operation === 'getAll') {
        method = 'GET';
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'delete') {
        method = 'DELETE';
    }
    else if (operation === 'deleteAll') {
        endpoint = '/phy2service/api/sach/compradoresremateall';
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}