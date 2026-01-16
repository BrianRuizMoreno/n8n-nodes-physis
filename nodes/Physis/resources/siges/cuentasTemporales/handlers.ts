import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET'; 
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    const idConexion = this.getNodeParameter('idConexion', index, 0) as number;

    switch (operation) {

        case 'clean':
            endpoint = `${baseUrl}/cuentastemp/limpia`;
            qs = { IdConexion: idConexion };
            break;
        case 'insertPrincipal':
            endpoint = `${baseUrl}/cuentastemp/ppal`;
            qs = {
                IdConexion: idConexion,
                Cuentas: this.getNodeParameter('cuentas', index) as string
            };
            break;
        case 'insertAuxiliary':
            endpoint = `${baseUrl}/cuentastemp/auxi`;
            qs = {
                IdConexion: idConexion,
                IdAuxi: this.getNodeParameter('idAuxi', index) as number,
                Cuentas: this.getNodeParameter('cuentas', index) as string
            };
            break;
        case 'insertAllAuxiliary':
            endpoint = `${baseUrl}/cuentastemp/auxi-all`;
            qs = {
                IdConexion: idConexion,
                Idauxi: this.getNodeParameter('idAuxi', index) as number 
            };
            break;
        case 'insertRegroupingPrincipal':
            endpoint = `${baseUrl}/cuentastemp/reagppal`;
            qs = {
                IdConexion: idConexion,
                IdReagPpal: this.getNodeParameter('idReagPpal', index) as number,
                Cuentas: this.getNodeParameter('cuentas', index) as string
            };
            break;
        case 'insertRegroupingAuxiliary':
            endpoint = `${baseUrl}/cuentastemp/reagauxi`;
            qs = {
                IdConexion: idConexion,
                IdAuxi: this.getNodeParameter('idAuxi', index) as number,
                IdReagAuxi: this.getNodeParameter('idReagAuxi', index) as number,
                Cuentas: this.getNodeParameter('cuentas', index) as string
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