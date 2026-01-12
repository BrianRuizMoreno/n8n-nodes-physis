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

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}
    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['POST', 'PUT', 'PATCH'].includes(method) || 
            ['getConsultaGrid', 'createMovimientoStock', 'updateMovimientoStock', 'blockProducto', 'unblockProducto'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    // --- PRODUCTOS ---
    if (operation === 'getAll') {
        endpoint = '/phy2service/api/sifac/productos'; 
    }
    else if (operation === 'getConsultaGrid') {
        endpoint = '/phy2service/api/sifac/productos/consultar';
        method = 'POST'; 
    }
    else if (operation === 'getArbol') {
        endpoint = '/phy2service/api/sifac/productos/arbol'; 
    }
    
    // --- STOCK Y MOVIMIENTOS ---
    else if (operation === 'getStock') {
        endpoint = `/phy2service/api/sifac/productos/${id}/stock`;
    }
    else if (operation === 'getStockDisponible') {
        endpoint = `/phy2service/api/sifac/productos/${id}/stock-disponible`; 
    }
    else if (operation === 'getMovimientosStock') {
        endpoint = `/phy2service/api/sifac/productos/${id}/stock/movimientos`;
    }
    else if (operation === 'createMovimientoStock') {
        endpoint = '/phy2service/api/sifac/productos/stock/movimientos';
        method = 'POST';
    }
    else if (operation === 'updateMovimientoStock') {
        endpoint = '/phy2service/api/sifac/productos/stock/movimientos';
        method = 'PATCH';
    }

    // --- PRECIOS Y SETTINGS ---
    else if (operation === 'getPrecios') {
        endpoint = `/phy2service/api/sifac/precios/productos/${id}`; 
    }
    else if (operation === 'getSettings') {
        endpoint = `/phy2service/api/sifac/productos/${id}/settings`;
    }
    else if (operation === 'blockProducto') {
        endpoint = '/phy2service/api/sifac/productos/piezas/bloqueo';
        method = 'POST';
    }
    else if (operation === 'unblockProducto') {
        endpoint = '/phy2service/api/sifac/productos/piezas/desbloqueo';
        method = 'POST';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}