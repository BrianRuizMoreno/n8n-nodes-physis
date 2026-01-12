import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let idComprobante = '';

    try { idComprobante = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        qs = json;
    } catch (e) {}

    if (operation === 'getAll') {
        endpoint = '/phy2service/api/siges/informes';
    }
    else if (operation === 'getPdfValores') {
        endpoint = '/phy2service/api/siges/informes/valores';
    }
    else if (operation === 'getPdfAfectaciones') {
        endpoint = '/phy2service/api/siges/informes/afectaciones';
    }
        else if (operation === 'getResumenCuenta') {
        endpoint = '/phy2service/api/siges/resumen-de-cuenta';
    }
    else if (operation === 'getDetalleAfectacion') {
        endpoint = `/phy2service/api/siges/resumen-de-cuenta/afectacion/${idComprobante}`;
    }
    else if (operation === 'getInfoComercial') {
        endpoint = '/phy2service/api/siges/resumen-de-cuenta/inf-comercial';
    }
    else if (operation === 'getComposicionSaldos') {
        endpoint = '/phy2service/api/siges/composicion-saldos';
    }
    else if (operation === 'getComposicionSaldosReagrupados') {
        endpoint = '/phy2service/api/siges/composicion-saldos-reagrupados';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}