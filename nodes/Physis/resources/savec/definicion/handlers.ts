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
            ['createConcepto', 'updateConcepto', 'createTipoContrato', 'updateTipoContrato', 'createMotivoRetiro', 'updateMotivoRetiro'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    if (operation === 'getCereales') {
        endpoint = '/phy2service/api/savec/cereales'; 
    } 
    else if (operation === 'getCerealesStock') {
        endpoint = '/phy2service/api/savec/cereales/stock'; 
    }
    else if (operation === 'getCampanias') {
        endpoint = '/phy2service/api/savec/campanias'; 
    }
    else if (operation === 'getCampaniasUsuario') {
        endpoint = `/phy2service/api/savec/usuarios/${id}/campanias`;
    }
    else if (operation === 'getConceptos') {
        endpoint = '/phy2service/api/savec/conceptos'; 
    }
    else if (operation === 'getConcepto') {
        endpoint = `/phy2service/api/savec/conceptos/${id}`;
    }
    else if (operation === 'createConcepto') {
        endpoint = '/phy2service/api/savec/conceptos';
        method = 'POST';
    }
    else if (operation === 'updateConcepto') {
        endpoint = '/phy2service/api/savec/conceptos';
        method = 'PUT';
    }
    else if (operation === 'deleteConcepto') {
        endpoint = `/phy2service/api/savec/conceptos/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getTiposContrato') {
        endpoint = '/phy2service/api/savec/tipos-contrato'; 
    }
    else if (operation === 'getTipoContrato') {
        endpoint = `/phy2service/api/savec/tipos-contrato/${id}`;
    }
    else if (operation === 'createTipoContrato') {
        endpoint = '/phy2service/api/savec/tipos-contrato';
        method = 'POST';
    }
    else if (operation === 'updateTipoContrato') {
        endpoint = '/phy2service/api/savec/tipos-contrato';
        method = 'PUT';
    }
    else if (operation === 'deleteTipoContrato') {
        endpoint = `/phy2service/api/savec/tipos-contrato/${id}`;
        method = 'DELETE';
    }
    else if (operation === 'getMotivosRetiro') {
        endpoint = '/phy2service/api/savec/motivos-retiro';
    }
    else if (operation === 'getMotivoRetiro') {
        endpoint = `/phy2service/api/savec/motivos-retiro/${id}`;
    }
    else if (operation === 'createMotivoRetiro') {
        endpoint = '/phy2service/api/savec/motivos-retiro';
        method = 'POST';
    }
    else if (operation === 'updateMotivoRetiro') {
        endpoint = '/phy2service/api/savec/motivos-retiro';
        method = 'PUT';
    }
    else if (operation === 'deleteMotivoRetiro') {
        endpoint = `/phy2service/api/savec/motivos-retiro/${id}`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}