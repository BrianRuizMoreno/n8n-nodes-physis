import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sach/tablasLsp';
    const method = 'GET';
    let qs: IDataObject = {};

    try {
        const idEspecie = this.getNodeParameter('idEspecie', index) as string;
        if (idEspecie) qs.idEspecie = idEspecie;
    } catch (e) {}

    if (operation === 'getMotivos') {
        endpoint = `${endpoint}/motivos`;
    }
    else if (operation === 'getEspecies') {
        endpoint = `${endpoint}/especies`;
    }
    else if (operation === 'getRazas') {
        endpoint = `${endpoint}/razas`;
    }
    else if (operation === 'getCategorias') {
        endpoint = `${endpoint}/categorias`;
    }
    else if (operation === 'getTipoTributo') {
        endpoint = `${endpoint}/tipotributo`;
    }
    else if (operation === 'getGastos') {
        endpoint = `${endpoint}/gastos`;
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}