import { IExecuteFunctions, IDataObject, INodeExecutionData, NodeApiError } from 'n8n-workflow';
import { PhysisTransport } from '../../../transport/transport';

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const operation = this.getNodeParameter('operation', index) as string;
    const transport = new PhysisTransport(this);
    let endpoint = '';
    let method = 'GET';
    let body: IDataObject = {};
    let qs: IDataObject = {};

    const baseUrl = '/phy2service/api/siges';

    switch (operation) {

        case 'uploadFile':
            method = 'POST';
            endpoint = `${baseUrl}/informe-control-diario-billetera`;
            
            const binaryPropertyName = this.getNodeParameter('binaryPropertyName', index) as string;
            
            const item = this.getInputData(index) as unknown as INodeExecutionData;
            
            if (!item.binary || !item.binary[binaryPropertyName]) {
                throw new NodeApiError(this.getNode(), {}, { message: `No se encontraron datos binarios en la propiedad "${binaryPropertyName}".` });
            }

            const binaryData = item.binary[binaryPropertyName];
            const buffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);
            
            let fileName = this.getNodeParameter('fileName', index, '') as string;
            if (!fileName) {
                fileName = binaryData.fileName || 'archivo_conciliacion.txt';
            }

            body = {
                archivo: {
                    value: buffer,
                    options: {
                        filename: fileName,
                        contentType: binaryData.mimeType || 'application/octet-stream',
                    },
                },
            };

            qs = {
                nombre: fileName
            };
            break;

        case 'getReport':
            method = 'GET';
            endpoint = `${baseUrl}/informe-control-diario-billetera`;
            qs = {
                filePath: this.getNodeParameter('filePath', index) as string
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