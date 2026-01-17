import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    const body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';
    let link = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { link = this.getNodeParameter('link', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        qs = json as IDataObject;
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/siges/reportes-compartidos';
    }
    else if (operation === 'get') {
        endpoint = `/phy2service/api/siges/reportes-compartidos/${id}`;
    }
    else if (operation === 'delete') {
        endpoint = `/phy2service/api/siges/reportes-compartidos/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getPdf') {
        endpoint = `/phy2service/api/siges/reportes-compartidos/${id}/pdf`;
    }
    else if (operation === 'getUsuarios') {
        endpoint = `/phy2service/api/siges/reportes-compartidos/${id}/usuarios`;
    }
    else if (operation === 'getGrupos') {
        endpoint = '/phy2service/api/siges/reportes-compartidos/grupos';
    }

    else if (operation === 'getComprobantePdf') {
        endpoint = '/phy2service/api/siges/comprobantepdf';
    }
    else if (operation === 'getDocumentoPdfByLink') {
        endpoint = `/phy2service/api/siges/documentospdf/${link}`;
    }
    else if (operation === 'generateDocumentosPdf') {
        endpoint = '/phy2service/api/siges/documentospdf';
        method = 'PUT';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}