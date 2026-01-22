"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoHaciendaFields = exports.tipoHaciendaOperations = void 0;
exports.tipoHaciendaOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tipoHacienda'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista todos los tipos de hacienda', action: 'Listar todos a tipo hacienda', },
            { name: 'Obtener Por ID', value: 'get', description: 'GET Obtiene un tipo de hacienda específico', action: 'Obtener por ID a tipo hacienda', },
            { name: 'Consulta Avanzada (V2)', value: 'searchV2', description: 'GET Búsqueda avanzada con filtros (vía JSON)', action: 'Consulta avanzada v2 a tipo hacienda', },
            { name: 'Crear', value: 'create', description: 'POST Inserta un nuevo tipo de hacienda', action: 'Crear a tipo hacienda', },
            { name: 'Actualizar', value: 'update', description: 'PUT Modifica un tipo de hacienda existente', action: 'Actualizar a tipo hacienda', },
            { name: 'Eliminar', value: 'delete', description: 'DELETE Elimina un tipo de hacienda', action: 'Eliminar a tipo hacienda', },
            { name: 'Listar Categorías De Hacienda', value: 'getCategoriasHacienda', description: 'GET Devuelve las categorías de hacienda filtradas por especie', action: 'Listar categor as de hacienda a tipo hacienda', },
            { name: 'Consultar RENSPA', value: 'getRenspa', description: 'GET Obtiene información de RENSPA', action: 'Consultar RENSPA a tipo hacienda', },
        ],
        default: 'getAll',
    },
];
exports.tipoHaciendaFields = [
    {
        displayName: 'ID Tipo Hacienda',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['tipoHacienda'],
                operation: ['get', 'delete']
            }
        },
        description: 'Código identificador del tipo de hacienda (string)',
    },
    {
        displayName: 'JSON Body / Parámetros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['tipoHacienda'],
                operation: ['create', 'update', 'searchV2', 'getCategoriasHacienda', 'getRenspa']
            }
        },
        description: 'Cuerpo para Create/Update, Filtro para SearchV2, o Parámetros Query para consultas (ej: {"idEspecie": 1} o {"idAuxi": 123})',
    },
];
//# sourceMappingURL=description.js.map