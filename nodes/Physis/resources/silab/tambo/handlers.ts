import { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let id = '';
    let qs: IDataObject = {};

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { qs = JSON.parse(this.getNodeParameter('jsonBody', index) as string); } catch (e) {}

    if (operation === 'getCampos') {
        endpoint = '/phy2service/api/silab/tambo/campos';
    } else if (operation === 'getActividades') {
        endpoint = '/phy2service/api/silab/tambo/actividades';
    } else if (operation === 'getProduccionDiaria') {
        endpoint = `/phy2service/api/silab/tambo/campos/${id}/produccion-diaria`;
    } else if (operation === 'getProduccionIndividual') {
        endpoint = `/phy2service/api/silab/tambo/campos/${id}/produccion-individual`;
    }

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data)
        ? data.map((item) => ({ json: item }))
        : [{ json: data as IDataObject }];
}