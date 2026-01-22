import { INodeProperties } from 'n8n-workflow';

export const reagrupacionRelacionPrincipalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['reagrupacionRelacionPrincipal'] } },
        options: [

            { name: 'Listar Seleccionadas', value: 'getSelected', description: 'GET Cuentas principales ya relacionadas', action: 'Listar seleccionadas a reagrupacion relacion principal',},
            { name: 'Listar Disponibles', value: 'getAvailable', description: 'GET Cuentas principales disponibles para relacionar', action: 'Listar disponibles a reagrupacion relacion principal',},
            { name: 'Listar Disponibles (Árbol)', value: 'getAvailableTree', description: 'GET Disponibles en formato árbol', action: 'Listar disponibles rbol a reagrupacion relacion principal',},
            { name: 'Obtener Detalle', value: 'getDetail', description: 'GET Detalle de una cuenta principal para relacionar', action: 'Obtener detalle a reagrupacion relacion principal',},
            { name: 'Crear Relación (Masiva)', value: 'create', description: 'POST Vincula lista de cuentas a una reagrupación', action: 'Crear relaci n masiva a reagrupacion relacion principal',},
            { name: 'Crear Relación (Directa)', value: 'createDirect', description: 'POST Inserta reagrupación de cuenta principal individual', action: 'Crear relaci n directa a reagrupacion relacion principal',},
        ],
        default: 'getSelected',
    },
];

export const reagrupacionRelacionPrincipalFields: INodeProperties[] = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['reagrupacionRelacionPrincipal'] 
            } 
        },
        description: 'Filtros (IdPpal, IdReagPpal) para GET, o Array de objetos para POST',
    },
];