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
    const origen = this.getNodeParameter('origen', index, 0) as number;

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) { }

    switch (operation) {
        case 'listDashboards':
            method = 'GET';
            endpoint = `${baseUrl}/tableros`;
            qs = { Origen: origen };
            break;

        case 'getDashboardData':
            method = 'GET';
            endpoint = `${baseUrl}/tablero`;
            qs = {
                Origen: origen,
                IdGrupo: this.getNodeParameter('idGrupo', index) as number,
                IdTablero: this.getNodeParameter('idTablero', index) as number,
                FechaDesde: this.getNodeParameter('fechaDesde', index, '') as string,
                FechaHasta: this.getNodeParameter('fechaHasta', index, '') as string
            };
            if (!qs.FechaDesde) delete qs.FechaDesde;
            if (!qs.FechaHasta) delete qs.FechaHasta;
            break;

        case 'createDashboard':
            method = 'POST';
            endpoint = `${baseUrl}/tablero`;
            body = {
                origen,
                ...jsonParameters
            };
            break;

        case 'updateDashboard':
            method = 'PUT';
            endpoint = `${baseUrl}/tablero`;
            body = {
                origen,
                ...jsonParameters
            };
            break;

        case 'getGridConfig':
            method = 'GET';
            endpoint = `${baseUrl}/aggrid`;
            qs = {
                Origen: origen,
                Grilla: this.getNodeParameter('grillaName', index) as string,
                IdUsuario: this.getNodeParameter('idUsuario', index, 0) as number
            };
            break;

        case 'updateGridConfig':
            method = 'PUT';
            endpoint = `${baseUrl}/aggrid`;
            body = {
                origen,
                grilla: this.getNodeParameter('grillaName', index) as string,
                ...jsonParameters
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