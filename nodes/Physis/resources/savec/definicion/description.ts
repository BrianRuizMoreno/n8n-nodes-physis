import { INodeProperties } from 'n8n-workflow';

export const definicionOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['savec'], resource: ['definicion'] } },
        options: [
            { name: 'Cereales: Listar', value: 'getCereales', description: 'GET Lista de cereales. Filtro opcional: {"todos": true}.' },
            { name: 'Cereales: Stock', value: 'getCerealesStock', description: 'GET Stock de cereales. Filtros: {"codCampania": 1, "fecha": "..."}.' },

            { name: 'Campañas: Listar', value: 'getCampanias', description: 'GET Lista de campañas. Filtro opcional: {"incluirRowTodos": true}.' },
            { name: 'Campañas: Por Usuario', value: 'getCampaniasUsuario', description: 'GET Lista de campañas asignadas a un usuario específico.' },

            { name: 'Conceptos: Listar', value: 'getConceptos', description: 'GET Lista conceptos. Filtros: clase, codConcepto.' },
            { name: 'Conceptos: Obtener', value: 'getConcepto', description: 'GET Obtiene un concepto por ID.' },
            { name: 'Conceptos: Crear', value: 'createConcepto', description: 'POST Crea un nuevo concepto.' },
            { name: 'Conceptos: Actualizar', value: 'updateConcepto', description: 'PUT Modifica un concepto existente.' },
            { name: 'Conceptos: Eliminar', value: 'deleteConcepto', description: 'DELETE Elimina un concepto por ID.' },

            { name: 'Tipos Contrato: Listar', value: 'getTiposContrato', description: 'GET Lista tipos. Filtros: id, filtroFijaciones (0,1,2).' },
            { name: 'Tipos Contrato: Obtener', value: 'getTipoContrato', description: 'GET Obtiene un tipo de contrato por ID.' },
            { name: 'Tipos Contrato: Crear', value: 'createTipoContrato', description: 'POST Crea un tipo de contrato.' },
            { name: 'Tipos Contrato: Actualizar', value: 'updateTipoContrato', description: 'PUT Modifica un tipo de contrato.' },
            { name: 'Tipos Contrato: Eliminar', value: 'deleteTipoContrato', description: 'DELETE Elimina un tipo de contrato por ID.' },

            { name: 'Motivos Retiro: Listar', value: 'getMotivosRetiro', description: 'GET Lista motivos de retiro.' },
            { name: 'Motivos Retiro: Obtener', value: 'getMotivoRetiro', description: 'GET Obtiene un motivo por ID.' },
            { name: 'Motivos Retiro: Crear', value: 'createMotivoRetiro', description: 'POST Crea un motivo de retiro.' },
            { name: 'Motivos Retiro: Actualizar', value: 'updateMotivoRetiro', description: 'PUT Modifica un motivo de retiro.' },
            { name: 'Motivos Retiro: Eliminar', value: 'deleteMotivoRetiro', description: 'DELETE Elimina un motivo por ID.' },
        ],
        default: 'getCereales',
    },
];

export const definicionFields: INodeProperties[] = [
    {
        displayName: 'ID / Código',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['definicion'], 
                operation: [
                    'getCampaniasUsuario',
                    'getConcepto', 'deleteConcepto',
                    'getTipoContrato', 'deleteTipoContrato',
                    'getMotivoRetiro', 'deleteMotivoRetiro'
                ] 
            } 
        },
        description: 'Identificador del recurso (ID Usuario, CodConcepto, TipoContrato, o MotivoRetiro).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['savec'], 
                resource: ['definicion'],
                operation: [
                    'getCereales', 'getCerealesStock',
                    'getCampanias',
                    'getConceptos', 'createConcepto', 'updateConcepto',
                    'getTiposContrato', 'createTipoContrato', 'updateTipoContrato',
                    'createMotivoRetiro', 'updateMotivoRetiro'
                ] 
            } 
        },
        description: 'Cuerpo JSON para operaciones Crear/Actualizar, o Filtros para operaciones Listar (ej: {"clase": "%"}).',
    },
];