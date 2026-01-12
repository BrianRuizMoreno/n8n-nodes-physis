import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let qs: IDataObject = {};
    let idIndicador = '';
    let idSerie = '';
    let tasa = '';

    try { idIndicador = this.getNodeParameter('idIndicador', index) as string; } catch (e) {}
    try { idSerie = this.getNodeParameter('idSerie', index) as string; } catch (e) {}
    try { tasa = this.getNodeParameter('tasa', index) as string; } catch (e) {}
    try { qs = JSON.parse(this.getNodeParameter('jsonBody', index) as string); } catch (e) {}

    if (operation === 'getTasaDefault') {
        endpoint = '/phy2service/api/siges/tasa';
    } else if (operation === 'getTasaSerie') {
        endpoint = `/phy2service/api/siges/indicadores/${idIndicador}/serie/${idSerie}`;
    } else if (operation === 'setTasa') {
        endpoint = `/phy2service/api/siges/indicadores/${idIndicador}/serie/${idSerie}/tasa/${tasa}`;
        method = 'POST';
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data }];
}