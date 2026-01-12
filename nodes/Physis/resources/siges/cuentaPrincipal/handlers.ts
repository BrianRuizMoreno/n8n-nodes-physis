import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/cuentas-ppal';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'update', 'search', 'searchOPRC', 'searchValores', 'searchRetenciones'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/siges/cuentas-ppal';
    }
    else if (operation === 'get') {
        endpoint = `/phy2service/api/siges/cuentas-ppal/${id}`;
    }
    else if (operation === 'create') {
        endpoint = '/phy2service/api/siges/cuentas-principales';
        method = 'POST';
    }
    else if (operation === 'update') {
        endpoint = '/phy2service/api/siges/cuentas-principales';
        method = 'PUT';
    }
    else if (operation === 'delete') {
        endpoint = '/phy2service/api/siges/cuentas-principales';
        method = 'DELETE';
    }
    
    else if (operation === 'getArbol') {
        endpoint = '/phy2service/api/siges/cuentas-principales/arbol';
    }
    else if (operation === 'getTreeList') {
        endpoint = '/phy2service/api/siges/cuentas-principales/treelist';
    }
    else if (operation === 'getDepositos') {
        endpoint = '/phy2service/api/siges/cuentas-ppal-depositos';
    }
    
    else if (operation === 'getAuxiliares') {
        endpoint = '/phy2service/api/siges/cuentas-principales/cuentas-auxiliares';
    }
    else if (operation === 'getByAuxi') {
        endpoint = `/phy2service/api/siges/cuentas-principales/de-auxi/${id}`; 
    }
    else if (operation === 'getReagrupacion') {
        endpoint = `/phy2service/api/siges/cuentas-principales/cuentas-Reag/${id}`;
    }
    else if (operation === 'getNext') {
        endpoint = `/phy2service/api/siges/cuentas-principales-siguiente/${id}`;
    }
    else if (operation === 'search') {
        endpoint = '/phy2service/api/siges/cuentas-ppal-buscar';
        method = 'POST';
    }
    else if (operation === 'searchOPRC') {
        endpoint = '/phy2service/api/siges/cuentas-ppal-buscar-oprc';
        method = 'POST';
    }
    else if (operation === 'searchValores') {
        endpoint = '/phy2service/api/siges/cuentas-ppal-buscar-valores';
        method = 'POST';
    }
    else if (operation === 'searchRetenciones') {
        endpoint = '/phy2service/api/siges/cuentas-ppal-buscar-retenciones';
        method = 'POST';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}