import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['insert', 'update'].includes(operation)) {
            qs.cuentaCte = JSON.stringify(json);
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`; 
    }
    else if (operation === 'insert') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes/insert';
    }
    else if (operation === 'update') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes/update';
    }
    else if (operation === 'delete') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes';
        method = 'DELETE';
    }
        else if (operation === 'getArbol') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes/arbol';
    }
    else if (operation === 'getMedios') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias/medios';
    }
    else if (operation === 'getMediosDesc') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-medios';
    }
    else if (operation === 'getMediosPorBanco') {
        endpoint = `/phy2service/api/siges/cuentas-corrientes-bancarias-medios/${qs.IdBanco || ''}`;
        delete qs.IdBanco; 
    }
    else if (operation === 'getExportaOP') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-ExportaOP';
    }
    else if (operation === 'getFiltroElectronico') {
        endpoint = '/phy2service/api/siges/cuentas-corrientes-bancarias-defecto-filtro-electronico';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}