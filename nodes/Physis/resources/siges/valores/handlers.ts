import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {

        case 'checkAvailability':
            method = 'GET';
            endpoint = `${baseUrl}/valores-disponibilidad-existen-comprobantes`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdComprobante: this.getNodeParameter('idComprobante', index) as number
            };
            break;
        case 'checkNegotiated':
            method = 'GET';
            endpoint = `${baseUrl}/valores-negociados-existen-comprobantes`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdComprobante: this.getNodeParameter('idComprobante', index) as number
            };
            break;
        case 'getLastCheckNumber':
            method = 'GET';
            endpoint = `${baseUrl}/valores-numero-cheque`;
            qs = {
                IdBanco: this.getNodeParameter('idBanco', index) as string,
                IdCuentaBancaria: this.getNodeParameter('idCuentaBancaria', index) as number,
                IdChequera: this.getNodeParameter('idChequera', index) as number
            };
            break;
        case 'getReceivedValues':
            method = 'GET';
            endpoint = `${baseUrl}/valores-recibidos`;
            qs = {
                IdEjercicio: this.getNodeParameter('idEjercicio', index) as number,
                IdComprobante: this.getNodeParameter('idComprobante', index) as number,
                Entrega: this.getNodeParameter('entrega', index) as boolean,
                TipoRecCau: this.getNodeParameter('tipoRecCau', index, 0) as number,
                Electronico: this.getNodeParameter('electronico', index, 0) as number 
            };
            if (qs.TipoRecCau === 0) delete qs.TipoRecCau;
            break;
        case 'getElectronicBatches':
            method = 'GET';
            endpoint = `${baseUrl}/valores-electronicos-NumeroEnvio`;
            qs = {
                sCodBanco: this.getNodeParameter('idBanco', index) as string,
                lCuentaBancaria: this.getNodeParameter('idCuentaBancaria', index) as number,
                sTipoConsulta: this.getNodeParameter('tipoConsulta', index) as string
            };
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada o no existe.`);
    }

    const response = await transport.request(method, endpoint, {}, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}