import { INodeProperties } from 'n8n-workflow';

export const cuentaPrincipalOperations: INodeProperties[] = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentaPrincipal'] } },
        options: [

			{ name: 'Get Many', value: 'getAll', description: 'GET Lista simple. Filtro: { "idAuxi": 1 }.' 
																																												action: 'Listar Todas a cuenta principal',},
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol' 
																																																							action: 'Listar Árbol a cuenta principal',},
            { name: 'Listar TreeList', value: 'getTreeList', description: 'GET Lista plana para árbol' 
																																																													action: 'Listar TreeList a cuenta principal',},
            { name: 'Listar Depósitos', value: 'getDepositos', description: 'GET Cuentas habilitadas para depósitos' 
																																																															action: 'Listar Depósitos a cuenta principal',},
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de cuenta principal (idCtaPpal)' 
																																																				action: 'Obtener por ID a cuenta principal',},
            { name: 'Crear', value: 'create', description: 'POST Inserta cuenta principal' 
																																														action: 'Crear a cuenta principal',},
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica cuenta principal' 
																																																			action: 'Actualizar a cuenta principal',},
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina cuenta. Req: Filtros {idPpal, idCtaPpal}.' 
																																																	action: 'Eliminar a cuenta principal',},
            { name: 'Cuentas Auxiliares', value: 'getAuxiliares', description: 'GET Auxiliares relacionadas. Req: Filtros {idCtaPpal, idAuxi}.' 
																																																																		action: 'Cuentas Auxiliares a cuenta principal',},
            { name: 'Por Plan Auxiliar', value: 'getByAuxi', description: 'GET Cuentas asociadas a un Plan Auxiliar (ID numérico)' 
																																																													action: 'Por Plan Auxiliar a cuenta principal',},
            { name: 'Cuentas Reagrupación', value: 'getReagrupacion', description: 'GET Cuentas de reagrupación de una principal' 
																																																																						action: 'Cuentas Reagrupación a cuenta principal',},
            { name: 'Siguiente ID', value: 'getNext', description: 'GET Próximo código disponible' 
																																																						action: 'Siguiente ID a cuenta principal',},
            { name: 'Buscar (General)', value: 'search', description: 'POST Búsqueda con filtros avanzados' 
																																																									action: 'Buscar (General) a cuenta principal',},
            { name: 'Buscar (OPRC)', value: 'searchOPRC', description: 'POST Búsqueda específica para OPRC' 
																																																										action: 'Buscar (OPRC) a cuenta principal',},
            { name: 'Buscar (Valores)', value: 'searchValores', description: 'POST Búsqueda para Valores' 
																																																																action: 'Buscar (Valores) a cuenta principal',},
            { name: 'Buscar (Retenciones)', value: 'searchRetenciones', description: 'POST Búsqueda para Retenciones' 
																																																																								action: 'Buscar (Retenciones) a cuenta principal',},
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
        description: 'Código de cuenta (ej: "1.1.01") o ID numérico de Plan Auxiliar (para operación Por Plan Auxiliar)',
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
        description: 'Cuerpo para Crear/Actualizar/Buscar, o Filtros para Listar/Eliminar (ej: {"idCtaPpal": "1.1"})',
    },
];