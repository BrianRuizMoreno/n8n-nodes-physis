import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/sifac';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = ''; 
    let idDeposito = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { idDeposito = this.getNodeParameter('idDeposito', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index, '{}') as string);
        if (['createMovimiento', 'updateMovimiento', 'createFirma', 'bloqueo', 'desbloqueo', 'searchAdvanced', 'upsertList'].includes(operation)) {
            body = json as IDataObject;
        } else {
            qs = json as IDataObject;
        }
    } catch (e) {}

    switch (operation) {

        case 'getStock':
            endpoint = `${endpoint}/productos/${id}/stock`;
            break;
        case 'getStockByDeposito':
            if (idDeposito && id) endpoint = `${endpoint}/depositos/${idDeposito}/productos/${id}/stock`;
            else if (idDeposito) endpoint = `${endpoint}/depositos/${idDeposito}/productos`;
            else endpoint = `${endpoint}/depositos/productos/stock`;
            break;
        case 'getStockDisponible':
            endpoint = `${endpoint}/productos/${id}/stock-disponible`;
            break;
        case 'getSaldos':
             endpoint = `${endpoint}/saldos/productos/${id}`;
             break;
        case 'getPesos':
            endpoint = `${endpoint}/productos/${id}/pesos`;
            break;
        case 'getMovimientos':
            endpoint = `${endpoint}/productos/${id}/stock/movimientos`;
            break;
        case 'createMovimiento':
            endpoint = `${endpoint}/productos/stock/movimientos`;
            method = 'POST';
            break;
        case 'updateMovimiento':
            endpoint = `${endpoint}/productos/stock/movimientos`;
            method = 'PATCH';
            break;
        case 'createFirma':
            const idCab = (body.idCabecera as string) || '';
            const idFirma = (body.idFirma as string) || '';
            endpoint = `${endpoint}/productos/stock/movimientos/${idCab}/firmas/${idFirma}`;
            method = 'POST';
            break;
        case 'search':
            endpoint = `${endpoint}/productos`;
            break;
        case 'searchAdvanced':
             endpoint = `${endpoint}/productos/consultar`;
             method = 'POST';
             break;
        case 'getArbol':
            endpoint = `${endpoint}/productos/arbol`;
            break;
        case 'getSettings':
            endpoint = `${endpoint}/productos/${id}/settings`;
            break;
        case 'getStructure':
            endpoint = `${endpoint}/productos/estructura-de-productos`;
            break;
        case 'bloqueo':
            endpoint = `${endpoint}/productos/piezas/bloqueo`;
            method = 'POST';
            break;
        case 'desbloqueo':
            endpoint = `${endpoint}/productos/piezas/desbloqueo`;
            method = 'POST';
            break;
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];
    return Array.isArray(data) ? data.map(item => ({ json: item })) : [{ json: data as IDataObject }];
}