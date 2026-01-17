import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    const body: IDataObject = {};
    let qs: IDataObject = {};
    let idAuxi = '';
    let idCtaAuxi = '';

    try {
        idAuxi = this.getNodeParameter('id', index) as string;
        idCtaAuxi = this.getNodeParameter('idCta', index) as string;
    } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (operation === 'upsert') {
            qs.creditoJson = JSON.stringify(json);
        } else {
            qs = { ...qs, ...json };
        }
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/siges/creditos';
        if (idAuxi) qs.IdAuxi = idAuxi;
        if (idCtaAuxi) qs.IdCtaAuxi = idCtaAuxi;
    }
    else if (operation === 'getTiposBienes') {
        endpoint = '/phy2service/api/siges/tipobienes';
    }
    else if (operation === 'upsert') {
        endpoint = '/phy2service/api/siges/creditos/insertupdate';
        method = 'POST';
    }
    else if (operation === 'delete') {
        endpoint = '/phy2service/api/siges/creditos/delete';
        method = 'POST'; 
        if (idAuxi) qs.IdAuxi = idAuxi;
        if (idCtaAuxi) qs.IdCtaAuxi = idCtaAuxi;
    }
    else if (operation === 'getDisponible') {
        endpoint = `/phy2service/api/siges/terceros/${idAuxi}/${idCtaAuxi}/credito-disponible`;
    }
    else if (operation === 'getDisponibleDetalle') {
        const opcion = qs.opcion || '0';
        endpoint = `/phy2service/api/siges/terceros/${idAuxi}/${idCtaAuxi}/${opcion}/credito-disponible-detalle`;
        delete qs.opcion; 
    }
    else if (operation === 'getFormasCancelacion') {
        endpoint = '/phy2service/api/siges/terceros/Creditos-Forma-Cancelacion';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}