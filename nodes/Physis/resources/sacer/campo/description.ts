import { INodeProperties } from 'n8n-workflow';

export const campoOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['campo'] } },
        options: [
            { 
                name: 'Árbol: Estructura Completa', 
                value: 'getArbol', 
                description: 'GET Estructura Zonas > Establecimientos > Campos > Lotes. Requiere ID Auxi y Cta Auxi.', action: 'Árbol: Estructura Completa a campo',
            },
            { name: 'Campos: Listar', value: 'getCampos', description: 'GET Lista campos. Filtro opcional: {"CodZona": 1}.', action: 'Campos: Listar a campo',},
            { name: 'Campos: Obtener', value: 'getCampo', description: 'GET Obtiene un campo por Código', action: 'Campos: Obtener a campo',},
            { name: 'Campos: Crear', value: 'createCampo', description: 'POST Crea un nuevo campo', action: 'Campos: Crear a campo',},
            { name: 'Campos: Actualizar', value: 'updateCampo', description: 'PUT Modifica un campo existente', action: 'Campos: Actualizar a campo',},
            { name: 'Campos: Eliminar', value: 'deleteCampo', description: 'DELETE Elimina un campo por Código', action: 'Campos: Eliminar a campo',},
            { name: 'Establecimientos: Listar Todos', value: 'getEstablecimientos', description: 'GET Lista todos los establecimientos', action: 'Establecimientos: Listar Todos a campo',},
            { name: 'Establecimientos: Por ID', value: 'getEstablecimiento', description: 'GET Obtiene un establecimiento específico', action: 'Establecimientos: Por ID a campo',},
            { name: 'Establecimientos: Por Tercero', value: 'getEstablecimientosTercero', description: 'GET Lista establecimientos de un productor (Req: ID Auxi/CtaAuxi)', action: 'Establecimientos: Por Tercero a campo',},
            { name: 'Establecimientos: Crear', value: 'createEstablecimiento', description: 'POST Crea un establecimiento', action: 'Establecimientos: Crear a campo',},
            { name: 'Establecimientos: Actualizar', value: 'updateEstablecimiento', description: 'PUT Actualiza un establecimiento', action: 'Establecimientos: Actualizar a campo',},
            { name: 'Establecimientos: Eliminar', value: 'deleteEstablecimiento', description: 'DELETE Elimina un establecimiento', action: 'Establecimientos: Eliminar a campo',},
        ],
        default: 'getCampos',
    },
];

export const campoFields: INodeProperties[] = [
    {
        displayName: 'ID Principal / Código',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['campo'], 
                operation: [
                    'getArbol', 
                    'getCampo', 'deleteCampo',
                    'getEstablecimiento', 'deleteEstablecimiento', 'getEstablecimientosTercero'
                ] 
            } 
        },
        description: 'Dependiendo de la operación: Código de Campo, ID de Establecimiento o ID Auxi (Productor)',
    },
    {
        displayName: 'ID Cta Auxi',
        name: 'idCtaAuxi',
        type: 'string',
        default: '',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['campo'], 
                operation: ['getArbol', 'getEstablecimientosTercero'] 
            } 
        },
        description: 'Identificador de cuenta auxiliar (Requerido para búsquedas por Productor/Tercero)',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['sacer'], 
                resource: ['campo'],
                operation: [
                    'getCampos', 
                    'createCampo', 'updateCampo',
                    'createEstablecimiento', 'updateEstablecimiento'
                ] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar o Filtros para Listar (ej: {"CodZona": 5})',
    },
];