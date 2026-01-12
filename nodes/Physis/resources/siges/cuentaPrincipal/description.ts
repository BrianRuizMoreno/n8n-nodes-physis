import { INodeProperties } from 'n8n-workflow';

export const cuentaPrincipalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentaPrincipal'] } },
        options: [

			{ name: 'Listar Todas', value: 'getAll', description: 'GET Lista simple. Filtro: { "idAuxi": 1 }.' },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol.' },
            { name: 'Listar TreeList', value: 'getTreeList', description: 'GET Lista plana para árbol.' },
            { name: 'Listar Depósitos', value: 'getDepositos', description: 'GET Cuentas habilitadas para depósitos.' },
            { name: 'Obtener por ID', value: 'get', description: 'GET Detalle de cuenta principal (idCtaPpal).' },
            { name: 'Crear', value: 'create', description: 'POST Inserta cuenta principal.' },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica cuenta principal.' },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina cuenta. Req: Filtros {idPpal, idCtaPpal}.' },
            { name: 'Cuentas Auxiliares', value: 'getAuxiliares', description: 'GET Auxiliares relacionadas. Req: Filtros {idCtaPpal, idAuxi}.' },
            { name: 'Por Plan Auxiliar', value: 'getByAuxi', description: 'GET Cuentas asociadas a un Plan Auxiliar (ID numérico).' },
            { name: 'Cuentas Reagrupación', value: 'getReagrupacion', description: 'GET Cuentas de reagrupación de una principal.' },
            { name: 'Siguiente ID', value: 'getNext', description: 'GET Próximo código disponible.' },
            { name: 'Buscar (General)', value: 'search', description: 'POST Búsqueda con filtros avanzados.' },
            { name: 'Buscar (OPRC)', value: 'searchOPRC', description: 'POST Búsqueda específica para OPRC.' },
            { name: 'Buscar (Valores)', value: 'searchValores', description: 'POST Búsqueda para Valores.' },
            { name: 'Buscar (Retenciones)', value: 'searchRetenciones', description: 'POST Búsqueda para Retenciones.' },
        ],
        default: 'getAll',
    },
];

export const cuentaPrincipalFields: INodeProperties[] = [
    {
        displayName: 'ID Cuenta Principal / Auxi',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentaPrincipal'], 
                operation: ['get', 'getByAuxi', 'getReagrupacion', 'getNext'] 
            } 
        },
        description: 'Código de cuenta (ej: "1.1.01") o ID numérico de Plan Auxiliar (para operación Por Plan Auxiliar).',
    },
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: { 
            show: { 
                service: ['siges'], 
                resource: ['cuentaPrincipal'] 
            } 
        },
        description: 'Cuerpo para Crear/Actualizar/Buscar, o Filtros para Listar/Eliminar (ej: {"idCtaPpal": "1.1"}).',
    },
];