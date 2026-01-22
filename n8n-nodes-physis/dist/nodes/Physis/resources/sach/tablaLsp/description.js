"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablaLspFields = exports.tablaLspOperations = void 0;
exports.tablaLspOperations = [
    {
        displayName: 'Operación',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { service: ['sach'], resource: ['tablaLsp'] } },
        options: [
            { name: 'Listar Motivos', value: 'getMotivos', description: 'GET Motivos AFIP para LSP', action: 'Listar motivos a tabla lsp', },
            { name: 'Listar Especies', value: 'getEspecies', description: 'GET Especies AFIP para LSP', action: 'Listar especies a tabla lsp', },
            { name: 'Listar Razas', value: 'getRazas', description: 'GET Razas AFIP por Especie', action: 'Listar razas a tabla lsp', },
            { name: 'Listar Categorías', value: 'getCategorias', description: 'GET Categorías AFIP por Especie', action: 'Listar categor as a tabla lsp', },
            { name: 'Listar Tipos De Tributo', value: 'getTipoTributo', description: 'GET Tipos de tributo para LSP', action: 'Listar tipos de tributo a tabla lsp', },
            { name: 'Listar Gastos', value: 'getGastos', description: 'GET Códigos de gastos AFIP para LSP', action: 'Listar gastos a tabla lsp', },
        ],
        default: 'getMotivos',
    },
];
exports.tablaLspFields = [
    {
        displayName: 'ID Especie',
        name: 'idEspecie',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                service: ['sach'],
                resource: ['tablaLsp'],
                operation: ['getRazas', 'getCategorias']
            }
        },
        description: 'Código de la especie para filtrar (ej: 1 para Bovinos)',
    },
];
//# sourceMappingURL=description.js.map