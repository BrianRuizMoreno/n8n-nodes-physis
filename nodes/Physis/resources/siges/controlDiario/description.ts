import { INodeProperties } from 'n8n-workflow';

export const controlDiarioOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['controlDiario'] } },
        options: [
            { 
                name: 'Subir Archivo Bancario', 
                value: 'uploadFile', 
                description: 'POST Sube el archivo diario del banco para iniciar la conciliación. Devuelve la ruta temporal.' 
            },
            { 
                name: 'Obtener Informe de Control', 
                value: 'getReport', 
                description: 'GET Procesa el archivo previamente subido y devuelve las diferencias encontradas.' 
            },
        ],
        default: 'uploadFile',
    },
];

export const controlDiarioFields: INodeProperties[] = [

    {
        displayName: 'Nombre Propiedad Binaria',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['controlDiario'],
                operation: ['uploadFile'] 
            } 
        },
        description: 'Nombre del campo en el item de entrada de n8n que contiene el archivo binario a subir (ej: "data", "file").',
    },
    {
        displayName: 'Nombre del Archivo (Opcional)',
        name: 'fileName',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['controlDiario'],
                operation: ['uploadFile'] 
            } 
        },
        description: 'Nombre con el que se guardará el archivo en el servidor. Si se deja vacío, se utilizará el nombre original del archivo binario.',
    },
    {
        displayName: 'Ruta del Archivo (File Path)',
        name: 'filePath',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['controlDiario'],
                operation: ['getReport'] 
            } 
        },
        description: 'Ruta completa del archivo en el servidor. Este valor se obtiene generalmente de la respuesta del paso "Subir Archivo Bancario".',
    },
];