import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/comprobantes/imagenes';
    let method = 'GET';
    const body: IDataObject = {};
    let qs: IDataObject = {};
    let idImagen = '';
    let idEjercicio = '';
    let idComprobante = '';
    let idSecuencia = '';

    try { idImagen = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idEjercicio = this.getNodeParameter('idEjercicio', index) as string; } catch (e) {}
    try { idComprobante = this.getNodeParameter('idComprobante', index) as string; } catch (e) {}
    try { idSecuencia = this.getNodeParameter('idSecuencia', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['create', 'update'].includes(operation)) {
            qs = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getAll') {
        if (idEjercicio) qs.IdEjercicio = idEjercicio;
        if (idComprobante) qs.IdComprobante = idComprobante;
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${idImagen}`;
        if (idEjercicio) qs.IdEjercicio = idEjercicio;
        if (idComprobante) qs.IdComprobante = idComprobante;
    }
    else if (operation === 'create') {
        method = 'POST';
        if (idEjercicio) qs.IdEjercicio = idEjercicio;
        if (idComprobante) qs.IdComprobante = idComprobante;
    }
    else if (operation === 'update') {
        method = 'PUT';
        if (idEjercicio) qs.IdEjercicio = idEjercicio;
        if (idComprobante) qs.IdComprobante = idComprobante;
        if (idImagen) qs.IdImagen = idImagen;
    }
    else if (operation === 'delete') {
        method = 'DELETE';
        if (idEjercicio) qs.IdEjercicio = idEjercicio;
        if (idComprobante) qs.IdComprobante = idComprobante;
        if (idImagen) qs.IdImagen = idImagen;
    }
    else if (operation === 'getPdfComprobante') {
        endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdf`;
    }
    else if (operation === 'getPdfAfip') {
        endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdfAfip`;
    }
    else if (operation === 'getPdfOprc') {
        endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/pdfOprc`;
    }
    else if (operation === 'getCertificadosList') {
        endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/certificados`;
    }
    else if (operation === 'getPdfCertificado') {
        endpoint = `/phy2service/api/siges/ejercicios/${idEjercicio}/comprobantes/${idComprobante}/certificados/${idSecuencia}/pdf`;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}