"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuentaPrincipalFields = exports.cuentaPrincipalOperations = void 0;
exports.cuentaPrincipalOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['siges'], resource: ['cuentaPrincipal'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista simple. Filtro: { "idAuxi": 1 }.', action: 'Listar todas a cuenta principal', },
            { name: 'Listar Árbol', value: 'getArbol', description: 'GET Estructura de árbol', action: 'Listar rbol a cuenta principal', },
            { name: 'Listar TreeList', value: 'getTreeList', description: 'GET Lista plana para árbol', action: 'Listar tree list a cuenta principal', },
            { name: 'Listar Depósitos', value: 'getDepositos', description: 'GET Cuentas habilitadas para depósitos', action: 'Listar dep sitos a cuenta principal', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Detalle de cuenta principal (idCtaPpal)', action: 'Obtener por ID a cuenta principal', },
            { name: 'Crear', value: 'create', description: 'POST Inserta cuenta principal', action: 'Crear a cuenta principal', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica cuenta principal', action: 'Actualizar a cuenta principal', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina cuenta. Req: Filtros {idPpal, idCtaPpal}.', action: 'Eliminar a cuenta principal', },
            { name: 'Cuentas Auxiliares', value: 'getAuxiliares', description: 'GET Auxiliares relacionadas. Req: Filtros {idCtaPpal, idAuxi}.', action: 'Cuentas auxiliares a cuenta principal', },
            { name: 'Por Plan Auxiliar', value: 'getByAuxi', description: 'GET Cuentas asociadas a un Plan Auxiliar (ID numérico)', action: 'Por plan auxiliar a cuenta principal', },
            { name: 'Cuentas Reagrupación', value: 'getReagrupacion', description: 'GET Cuentas de reagrupación de una principal', action: 'Cuentas reagrupaci n a cuenta principal', },
            { name: 'Siguiente ID', value: 'getNext', description: 'GET Próximo código disponible', action: 'Siguiente ID a cuenta principal', },
            { name: 'Buscar (General)', value: 'search', description: 'POST Búsqueda con filtros avanzados', action: 'Buscar general a cuenta principal', },
            { name: 'Buscar (OPRC)', value: 'searchOPRC', description: 'POST Búsqueda específica para OPRC', action: 'Buscar (OPRC) a cuenta principal', },
            { name: 'Buscar (Valores)', value: 'searchValores', description: 'POST Búsqueda para Valores', action: 'Buscar valores a cuenta principal', },
            { name: 'Buscar (Retenciones)', value: 'searchRetenciones', description: 'POST Búsqueda para Retenciones', action: 'Buscar retenciones a cuenta principal', },
        ],
        default: 'getAll',
    },
];
exports.cuentaPrincipalFields = [
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
//# sourceMappingURL=description.js.map