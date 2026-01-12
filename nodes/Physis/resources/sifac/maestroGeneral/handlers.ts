import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac';
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        qs = json as IDataObject; 
    } catch (e) {}

    switch (operation) {
        case 'getContablesArbol':
            endpoint += '/clientes/contables/arbol';
            break;
        case 'getDominios':
            endpoint += '/dominios';
            break;
        case 'getDominio':
            endpoint += `/dominios/${id}`;
            break;
        case 'getDominiosPLA':
            endpoint += '/dominios-pla';
            break;
        case 'searchCabeceras':
            endpoint += '/cabeceras';
            break;
    }

    const response = await transport.request('GET', endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data as IDataObject }];
}