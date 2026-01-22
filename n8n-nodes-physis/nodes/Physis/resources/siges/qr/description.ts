import { INodeProperties } from 'n8n-workflow';

export const qrOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['qr'] } },
        options: [
            { 
                name: 'Leer QR De Comprobante', 
                value: 'readQr', 
                description: 'POST Sube un archivo (PDF/Imagen), detecta el QR de AFIP y devuelve los datos decodificados', 
				action: 'Leer qr de comprobante a qr',
            },
        ],
        default: 'readQr',
    },
];

export const qrFields: INodeProperties[] = [
    {
        displayName: 'Nombre Propiedad Binaria',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['qr'],
                operation: ['readQr'] 
            } 
        },
        description: 'Nombre del campo en el item de entrada que contiene el archivo de la factura',
    },
    {
        displayName: 'Nombre Del Archivo (Opcional)',
        name: 'fileName',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['qr'],
                operation: ['readQr'] 
            } 
        },
        description: 'Nombre para asignar al archivo subido. Si se omite, se usa el original.',
    },
];