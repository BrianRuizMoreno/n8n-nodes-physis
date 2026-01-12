import { INodeProperties } from 'n8n-workflow';

export const zonaOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sifac'], resource: ['zona'] } },
        options: [
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol de zonas.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Datos de una zona (idCtaReagAuxi).' },
            { name: 'Crear', value: 'create', description: 'POST Crea una nueva zona.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica una zona existente.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina una zona por ID.' },
        ],
        default: 'getArbol',
    },
];

export const zonaFields: INodeProperties[] = [
    {
        displayName: 'ID Zona (CtaReagAuxi)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['zona'], 
                operation: ['get', 'delete'] 
            } 
        },
        description: 'Identificador único de la zona.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sifac'], 
                resource: ['zona'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Árbol (ej: {"imputables": true}).',
    },
];