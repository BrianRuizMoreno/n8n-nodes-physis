import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/chequeras';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let idChequera = '';
    let idBanco = '';
    let idCuenta = '';

    try {
        if (['get', 'delete'].includes(operation)) {
            idChequera = this.getNodeParameter('idChequera', index) as string;
            idBanco = this.getNodeParameter('idBanco', index) as string;
            idCuenta = this.getNodeParameter('idCuentasBancarias', index) as string;
        }
    } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'update'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${idChequera}/${idBanco}/${idCuenta}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        method = 'DELETE';
        qs.idChequera = idChequera;
        qs.idBanco = idBanco;
        qs.idCuentaCte = idCuenta; 
    }
    else if (operation === 'getNext') {
        endpoint = '/phy2service/api/siges/chequeras-proximo-id';
    }
    else if (operation === 'getByFiltroElectronico') {
        endpoint = '/phy2service/api/siges/chequeras-defecto-filtro-electronico';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}