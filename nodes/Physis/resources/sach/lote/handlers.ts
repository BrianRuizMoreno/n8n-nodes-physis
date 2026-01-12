import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['upsert', 'upsertByCarga', 'upsertGrid', 'upsertByCargaGrid'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/sach/lotes'; 
    }
    else if (operation === 'getAllGrid') {
        endpoint = '/phy2service/api/sach/v2/lotes'; 
    }
    else if (operation === 'get') {
        endpoint = `/phy2service/api/sach/lotes/${id}`; 
    }
    else if (operation === 'upsert') {
        endpoint = '/phy2service/api/sach/lotes';
        method = 'POST';
    }
    else if (operation === 'delete') {
        endpoint = '/phy2service/api/sach/lotes';
        method = 'DELETE'; 
    }
    else if (operation === 'getByCarga') {
        endpoint = `/phy2service/api/sach/lotesbycarga/${id}`; 
    }
    else if (operation === 'upsertByCarga') {
        endpoint = '/phy2service/api/sach/lotesbycarga';
        method = 'POST'; 
    }
    else if (operation === 'deleteByCarga') {
        endpoint = '/phy2service/api/sach/lotesbycarga';
        method = 'DELETE'; 
    }
    else if (operation === 'getProximo') {
        endpoint = `/phy2service/api/sach/lotes/proximo/${id}`; 
    }
    else if (operation === 'getPuestos') {
        endpoint = '/phy2service/api/sach/lotes/puestosdecarga';
    }
    else if (operation === 'getFormasCobro') {
        endpoint = '/phy2service/api/sach/lotes/formasdecobro';
    }
    else if (operation === 'getExisteBoleto') {
        endpoint = '/phy2service/api/sach/lotes/existeboleto'; 
    }
    else if (operation === 'getPendientes') {
        endpoint = '/phy2service/api/sach/lotes/pendientesdeemision'; 
    }
    else if (operation === 'getTipoComprobante') {
        endpoint = '/phy2service/api/sach/lotes/tipo-comprobante'; 
    }
    else if (operation === 'getPrefijos') {
        endpoint = '/phy2service/api/sach/lotes/prefijos'; 
    }
    else if (operation === 'getGastoComisionTotal') {
        endpoint = '/phy2service/api/sach/lotes/gasto-comision-total'; 
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}