import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/terceros';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    
    let idAuxi = '';
    let idCtaAuxi = '';

    try { idAuxi = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idCtaAuxi = this.getNodeParameter('idCta', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['saveDomicilio', 'tableSearch', 'tableSearchCuentas'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}
    
    if (operation === 'search') {
        endpoint = endpoint; 
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${idAuxi}/${idCtaAuxi}`;
    }
    else if (operation === 'getMe') {
        endpoint = `${endpoint}/me`;
    }
    else if (operation === 'getSinUsuario') {
        endpoint = `${endpoint}/${idAuxi}/sin-usuario-asignado`;
    }
    else if (operation === 'getByNroDoc') {
        endpoint = '/phy2service/api/siges/terceros-nrodoc';
    }

    else if (operation === 'getDomicilios') {
        endpoint = `${endpoint}/${idAuxi}/${idCtaAuxi}/domicilios`;
    }
    else if (operation === 'saveDomicilio') {
        endpoint = `${endpoint}/${idAuxi}/${idCtaAuxi}/domicilios`;
        method = 'POST';
    }

    else if (operation === 'getCuentasBancarias') {
        endpoint = '/phy2service/api/siges/terceroscuentasbancarias';
    }
    else if (operation === 'getCuentasBancariasDetalle') {
        endpoint = `/phy2service/api/siges/terceroscuentasbancarias/${idAuxi}`;
    }
    else if (operation === 'getContactosReagrupados') {
        endpoint = `${endpoint}/contactosreagrupados`;
    }

    else if (operation === 'tableSearch') {
        endpoint = `${endpoint}/consulta`;
        method = 'POST';
    }
    else if (operation === 'tableSearchCuentas') {
        endpoint = `${endpoint}/cuentas-bancarias/consulta`;
        method = 'POST';
    }
    else if (operation === 'getFiltroCCB') {
        endpoint = `${endpoint}/FiltroCCB`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}