import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = ''; 
    let idAuxi = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idAuxi = this.getNodeParameter('idAuxi', index) as string; } catch (e) {}

    let jsonParameters: IDataObject = {};
    try {
        const jsonString = this.getNodeParameter('jsonBody', index) as string;
        jsonParameters = JSON.parse(jsonString);
    } catch (e) {}

    const baseUrlSifac = '/phy2service/api/sifac';

    switch (operation) {
        // -----------------------------------------------------------
        // 1. CONCEPTOS
        // -----------------------------------------------------------
        case 'getConceptos':
            method = 'GET';
            endpoint = `${baseUrlSifac}/conceptos`;
            qs = jsonParameters; 
            break;

        // -----------------------------------------------------------
        // 2. CONSULTAS TERCEROS (REPORTES DINÁMICOS)
        // -----------------------------------------------------------
        case 'consultaTerceros':
            method = 'GET';
            endpoint = `${baseUrlSifac}/consultas/terceros`;
            
            if (Object.keys(jsonParameters).length > 0) {
                qs = {
                    consulta: JSON.stringify(jsonParameters)
                };
            }
            break;

        // -----------------------------------------------------------
        // 3. GRUPOS CUENTAS AUXILIARES (PERMISOS ESPECÍFICOS)
        // -----------------------------------------------------------
        case 'getGrupoCuentas':
            if (!id || !idAuxi) throw new Error('Los campos "ID Grupo" e "ID Auxi" son obligatorios para esta operación.');
            
            method = 'GET';
            endpoint = `${baseUrlSifac}/grupos/${id}/planes-de-cuentas-auxiliares/${idAuxi}/cuentas-auxiliares`;
            qs = jsonParameters; 
            break;

        case 'updateGrupoCuentas':
            if (!id || !idAuxi) throw new Error('Los campos "ID Grupo" e "ID Auxi" son obligatorios para esta operación.');
            
            method = 'POST';
            endpoint = `${baseUrlSifac}/grupos/${id}/planes-de-cuentas-auxiliares/${idAuxi}/cuentas-auxiliares`;
            body = jsonParameters;
            break;

        default:
            throw new Error(`La operación "${operation}" no está soportada en el recurso Varios.`);
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}