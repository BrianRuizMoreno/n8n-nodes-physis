import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    const method = 'GET';
    let qs: IDataObject = {};

    try {
        const idComprobante = this.getNodeParameter('idComprobante', index, '') as string;
        if (idComprobante) qs.IdComprobante = idComprobante;

        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        Object.assign(qs, json);
    } catch (e) {
    }

    if (operation === 'getComisionesComprobante') {
        endpoint = '/phy2service/api/sach/comisiones/comisiones-de-comprobante';
    }
    else if (operation === 'getComisionesDevengadas') {
        endpoint = '/phy2service/api/sach/comisionesdevengadas';
    }
    else if (operation === 'getResumenOperaciones') {
        endpoint = '/phy2service/api/sach/resumen-de-operaciones';
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}