import { INodeProperties } from 'n8n-workflow';

export const infraestructuraOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['infraestructura'] } },
        options: [

			{ name: 'Plantas: Listar', value: 'getPlantas', description: 'GET Lista de plantas. Filtros: { "deTerceros": true, "idAuxi": 123 }.' },
            { name: 'Plantas: Obtener', value: 'getPlanta', description: 'GET Datos de una planta. Filtro opcional: { "traerExistenciaSilos": true }.' },
            { name: 'Plantas: Numeradores', value: 'getNumeradoresPlanta', description: 'GET Numeradores de una planta. Filtros: idTipoFormato, formulario.' },
            { name: 'Plantas: Crear', value: 'createPlanta', description: 'POST Crea una nueva planta.' },
            { name: 'Plantas: Actualizar', value: 'updatePlanta', description: 'PUT Modifica una planta existente.' },
            { name: 'Plantas: Eliminar', value: 'deletePlanta', description: 'DELETE Elimina una planta por código.' },
            { name: 'Silos: Listar', value: 'getSilos', description: 'GET Lista de silos.' },
            { name: 'Silos: Obtener', value: 'getSilo', description: 'GET Datos de un silo específico (Por NroSilo).' },
            { name: 'Silos: Crear', value: 'createSilo', description: 'POST Crea un nuevo silo.' },
            { name: 'Silos: Actualizar', value: 'updateSilo', description: 'PUT Modifica un silo existente.' },
            { name: 'Silos: Eliminar', value: 'deleteSilo', description: 'DELETE Elimina un silo por ID.' },
        ],
        default: 'getPlantas',
    },
];

export const infraestructuraFields: INodeProperties[] = [
    {
        displayName: 'Cód. Planta / Silo',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['infraestructura'], 
                operation: [
                    'getPlanta', 'deletePlanta', 'getNumeradoresPlanta',
                    'getSilo', 'deleteSilo'
                ] 
            } 
        },
        description: 'Código de la Planta o Número/ID del Silo.',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['infraestructura'],
                operation: [
                    'getPlantas', 'getPlanta', 'getNumeradoresPlanta',
                    'createPlanta', 'updatePlanta',
                    'createSilo', 'updateSilo'
                ] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar (ej: {"deTerceros": true}).',
    },
];