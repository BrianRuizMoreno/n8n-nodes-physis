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
        
        if (['POST', 'PUT'].includes(method) || 
            ['createAgro', 'updateAgro', 'createFaenador', 'updateFaenador'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    // --- ESTABLECIMIENTOS AGROPECUARIOS ---
    if (operation === 'getAllAgro') {
        endpoint = '/phy2service/api/sach/establecimientos-agropecuarios';
    }
    else if (operation === 'getAgro') {
        endpoint = `/phy2service/api/sach/establecimientos-agropecuarios/${id}`;
    }
    else if (operation === 'createAgro') {
        endpoint = '/phy2service/api/sach/establecimientos-agropecuarios';
        method = 'POST';
    }
    else if (operation === 'updateAgro') {
        endpoint = '/phy2service/api/sach/establecimientos-agropecuarios';
        method = 'PUT';
    }
    else if (operation === 'getAgroByCliente') {
        endpoint = '/phy2service/api/sach/clientes/establecimientos-agropecuarios';
    }
    else if (operation === 'getRenspaAgroByCliente') {
        endpoint = '/phy2service/api/sach/clientes/renspa-establecimientos-agropecuarios';
    }

    // --- ESTABLECIMIENTOS FAENADORES ---
    else if (operation === 'getAllFaenador') {
        endpoint = '/phy2service/api/sach/establecimientos-faenadores';
    }
    else if (operation === 'getFaenador') {
        endpoint = `/phy2service/api/sach/establecimientos-faenadores/${id}`;
    }
    else if (operation === 'createFaenador') {
        endpoint = '/phy2service/api/sach/establecimientos-faenadores';
        method = 'POST';
    }
    else if (operation === 'updateFaenador') {
        endpoint = '/phy2service/api/sach/establecimientos-faenadores';
        method = 'PUT';
    }
    else if (operation === 'getFaenadorByCliente') {
        endpoint = '/phy2service/api/sach/clientes/establecimientos-faenadores';
    }
    else if (operation === 'getOnccaFaenadorByCliente') {
        endpoint = '/phy2service/api/sach/clientes/onca-establecimientos-faenadores';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}