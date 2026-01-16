import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    switch (operation) {

        case 'getAll':
            const useAllEndpoint = this.getNodeParameter('useAllEndpoint', index, false) as boolean;
            
            if (useAllEndpoint) {
                method = 'GET';
                endpoint = `${baseUrl}/tipos-comprobante/all`;
            } else {
                method = 'GET';
                endpoint = `${baseUrl}/tipos-comprobante`;
                qs = {
                    idModelo: this.getNodeParameter('idModelo', index, 0) as number,
                    fechaVigencia: this.getNodeParameter('fechaVigencia', index, '') as string,
                };
                if (!qs.fechaVigencia) delete qs.fechaVigencia;
                if (qs.idModelo === 0) delete qs.idModelo;
            }
            break;
        case 'get':
            const id = this.getNodeParameter('idTipoComprobante', index) as string;
            method = 'GET';
            endpoint = `${baseUrl}/tipos-comprobante/${id}`;
            break;
        case 'create':
            method = 'POST';
            endpoint = `${baseUrl}/tipos-comprobante`;
            body = jsonParameters;
            break;
        case 'update':
            method = 'PUT';
            endpoint = `${baseUrl}/tipos-comprobante`;
            body = jsonParameters;
            break;
        case 'delete':
            const idDel = this.getNodeParameter('idTipoComprobante', index) as string;
            method = 'DELETE';
            endpoint = `${baseUrl}/tipos-comprobante/${idDel}`;
            break;
        case 'getNumerators':
            const idNum = this.getNodeParameter('idTipoComprobante', index) as string;
            method = 'GET';
            endpoint = `${baseUrl}/tipos-comprobante/${idNum}/numeradores`;
            break;
        case 'getByAffectation':
            method = 'GET';
            endpoint = `${baseUrl}/tipos-comprobante-all-afectacion`;
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index) as number,
                Afectacion: this.getNodeParameter('afectacion', index) as number, 
                FechaVigencia: this.getNodeParameter('fechaVigencia', index) as string
            };
            break;
        case 'getByIVA':
            method = 'GET';
            endpoint = `${baseUrl}/tipos-comprobante-all-iva`;
            qs = {
                IdPpal: this.getNodeParameter('idPpal', index) as number,
                TipoIVA: this.getNodeParameter('tipoIva', index) as string // 'C' o 'V'
            };
            break;
        case 'getClasses':
            method = 'GET';
            endpoint = `${baseUrl}/tipos-comprobante/clases`;
            qs = {
                Origen: this.getNodeParameter('origen', index) as number,
                SubSistema: this.getNodeParameter('subSistema', index) as string
            };
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}