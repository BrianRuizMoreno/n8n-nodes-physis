import { INodeProperties } from 'n8n-workflow';

export const cuentaAuxiliarOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentaAuxiliar'] } },
        options: [

			{ name: 'Listar Todas', value: 'getAll', description: 'GET Lista todas las cuentas auxiliares.' },
            { name: 'Listar por Plan (Simple)', value: 'getByPlan', description: 'GET Cuentas de un plan específico (IdAuxi).' },
            { name: 'Listar por Plan (Filtros)', value: 'getByPlanFiltered', description: 'GET Cuentas de un plan con filtros de lectura.' },
            { name: 'Listar por Principal', value: 'getByPpal', description: 'GET Cuentas asociadas a una principal.' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol.' },
            { name: 'Listar TreeList', value: 'getTreeList', description: 'GET Estructura plana para TreeList.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de cuenta auxiliar (idCtaAuxi).' },
            { name: 'Crear', value: 'create', description: 'POST Inserta cuenta auxiliar.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica cuenta auxiliar.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina cuenta. Req: Filtros {idAuxi, idCtaAuxi}.' },
            { name: 'Siguiente ID', value: 'getNext', description: 'GET Sugiere el siguiente código disponible.' },
            { name: 'Tipos Tercero', value: 'getTiposTercero', description: 'GET Lista tipos de tercero.' },
            { name: 'Tipos Domicilio', value: 'getTiposDomicilio', description: 'GET Lista tipos de domicilio.' },
            { name: 'Requisitos Crédito', value: 'getCreditoRequisitos', description: 'GET Lista requisitos de crédito.' },
        ],
        default: 'getAll',
    },
];

export const cuentaAuxiliarFields: INodeProperties[] = [
    {
        displayName: 'ID (Cuenta / Plan)',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentaAuxiliar'], 
                operation: ['get', 'getByPlan', 'getByPlanFiltered'] 
            } 
        },
        description: 'IdCtaAuxi (para Get) o IdAuxi (para GetByPlan).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentaAuxiliar'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar, o Filtros para Listar/Eliminar (ej: {"idAuxi": 1, "idCtaAuxi": "C01"}).',
    },
];