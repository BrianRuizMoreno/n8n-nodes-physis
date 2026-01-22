"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tarifaFleteFields = exports.tarifaFleteOperations = void 0;
exports.tarifaFleteOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sacer'], resource: ['tarifaFlete'] } },
        options: [
            { name: 'Get Many', value: 'getAll', description: 'GET Lista las tablas de tarifas (Cabeceras)', action: 'Listar tablas a tarifa flete', },
            { name: 'Consultar Por KM', value: 'getByKm', description: 'GET Obtiene la tarifa específica para una distancia y tabla', action: 'Consultar por KM a tarifa flete', },
            { name: 'Crear', value: 'create', description: 'POST Inserta una nueva tabla de tarifas con sus rangos', action: 'Crear a tarifa flete', },
        ],
        default: 'getAll',
    },
];
exports.tarifaFleteFields = [
    {
        displayName: 'JSON Body / Filtros',
        name: 'jsonBody',
        type: 'json',
        default: '{}',
        displayOptions: {
            show: {
                service: ['sacer'],
                resource: ['tarifaFlete']
            }
        },
        description: 'Parámetros de consulta (CodTabla, Km, CodCampania) o Cuerpo para Crear',
    },
];
//# sourceMappingURL=description.js.map