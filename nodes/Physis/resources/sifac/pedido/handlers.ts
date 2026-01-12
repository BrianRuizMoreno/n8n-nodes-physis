import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac/pedidos';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['POST', 'PUT'].includes(method) || 
            ['create', 'update', 'getComprobantesAsociados'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        endpoint = `${endpoint}/${id}`;
        method = 'PUT';
    }
    else if (operation === 'getComprobantesAsociados') {
        endpoint = `${endpoint}/${id}/comprobantes-asociados`;

        if (body.operacion || body.idMovimiento) {
            if (body.operacion) { qs.operacion = body.operacion; delete body.operacion; }
            if (body.idMovimiento) { qs.idMovimiento = body.idMovimiento; delete body.idMovimiento; }
        }

    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}