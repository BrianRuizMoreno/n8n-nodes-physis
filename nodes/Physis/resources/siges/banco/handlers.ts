import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '/phy2service/api/siges/bancos';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};
    let id = '';

    try { id = this.getNodeParameter('id', index) as string; } catch (e) {}

    try { 
        const json = JSON.parse(this.getNodeParameter('jsonBody', index) as string);
        
        if (['POST', 'PUT'].includes(method) || 
            ['create', 'update', 'createCuentaTercero', 'updateCuentaTercero'].includes(operation)) {
            body = json;
        } else {
            qs = json;
        }
    } catch (e) {}

    // --- BANCOS  ---
    if (operation === 'getAll') {
    }
    else if (operation === 'get') {
        endpoint = `${endpoint}/${id}`;
    }
    else if (operation === 'create') {
        method = 'POST';
    }
    else if (operation === 'update') {
        method = 'PUT';
    }
    else if (operation === 'delete') {
        method = 'DELETE';
        if (id) qs.idBanco = id;
    }

    // --- CONSULTAS ESPECÍFICAS ---
    else if (operation === 'getArbol') {
        endpoint = `${endpoint}/arbol`;
    }
    else if (operation === 'getCCMedios') {
        endpoint = `${endpoint}/cuentas-corrientes-medios`;
    }
    else if (operation === 'getCCElectronicos') {
        endpoint = `${endpoint}/cuentas-corrientes-electronicos`;
    }
    else if (operation === 'getCaucion') {
        endpoint = `${endpoint}/cuentas-caucion`;
    }
    else if (operation === 'getConMedios') {
        endpoint = `${endpoint}/con-medios-o-electronicos`;
    }
    else if (operation === 'getExportaOP') {
        endpoint = `${endpoint}/cuentas-corrientes-exportaOP`;
    }
    else if (operation === 'getFormatos') {
        endpoint = `${endpoint}/valores-electronicos-formatos`;
    }
    else if (operation === 'getCodigosOperacion') {
        endpoint = `${endpoint}/codigos-operacion`;
    }
    else if (operation === 'getConFormatos'){
        endpoint = `${endpoint}con-formatos-valores-electronicos`;
    }

    // --- CUENTAS BANCARIAS TERCEROS ---
    else if (operation === 'getCuentaTercero') {
        endpoint = `${endpoint}/CuentaBancariaTercero`;
    }
    else if (operation === 'createCuentaTercero') {
        endpoint = `${endpoint}/CuentaBancariaTercero`;
        method = 'POST';
    }
    else if (operation === 'updateCuentaTercero') {
        endpoint = `${endpoint}/CuentaBancariaTercero`;
        method = 'PUT';
    }
    else if (operation === 'deleteCuentaTercero') {
        endpoint = `${endpoint}/CuentaBancariaTercero`;
        method = 'DELETE';
    }

    const response = await transport.request(method, endpoint, body, qs) as IDataObject;
    const data = (response.Datos || response) as IDataObject | IDataObject[];

    return Array.isArray(data) 
        ? data.map((item) => ({ json: item })) 
        : [{ json: data as IDataObject }];
}